const AFFL_PUNCT = /[.,:;-|]/;

function subset(obj, keys) {
  const entries = Object.entries(obj)
    .filter(([k, v]) => keys.has(k));

  return Object.fromEntries(entries);
}

function sessionSlots(prog, tzOffset) {
  const slots = {};

  prog.timeSlots.forEach(s => {
    if(s.type === 'SESSION') {
      let { startDate: start, endDate: end, id } = s;

      start += tzOffset;
      end += tzOffset;

      slots[id] = { start, end };
    }
  })

  return slots;
}

function sessionTable(prog, tzOffset) {
  const contents = {};
  const info = {};
  const slots = sessionSlots(prog, tzOffset);

  prog.sessions.forEach(session => {
    info[session.id] = {
      name: session.name,
      ...slots[session.timeSlotId]
    };

    session.contentIds.forEach(cid => {
      contents[cid] ? contents[cid].push(session.id) : (contents[cid] = [session.id]);
    });
  });

  return { contents, info };
}

function peopleTable(prog) {
  const table = {};

  prog.people.forEach(person => {
    table[person.id] = person;
  });

  return table;
}

function formatAuthor(a) {
  return `${a.firstName} ${a.middleInitial ? a.middleInitial + ' ' : ''}${a.lastName}`;
}

function getAuthors(item, people) {
  const authors = [], affiliation = {};
  
  item.authors && item.authors.forEach(a => {
    authors.push(formatAuthor(people[a.personId]));
    a.affiliations && a.affiliations.forEach(af => {
      const trunc = af.institution.trim();
      const key = trunc.replace(AFFL_PUNCT, '').toLowerCase();

      affiliation[key] || (affiliation[key] = trunc);
    });
  });

  return {
    authors,
    affiliations: Object.values(affiliation)
  };
}

function flat(item, sequence, track, copyFields, linkSections, sessions, people) {
  const result = {
    id: item.id,
    sequence,
    track,
    session: sessions[item.id] || [],
    links: {},
    ...getAuthors(item, people),
    ...subset(item, copyFields)
  };
  let linkFilter = link => {
    result.links[link.type] = link.url;
  }

  item.qaLink && (result.qa = item.qaLink.url);
  item.broadcastLink && (result.broadcast = item.broadcastLink.url);
  item.doi && (result.links['DOI'] = item.doi);

  if(item.videos) {
    if(linkSections) {
      Object.keys(linkSections).forEach(k => result[k] = {});
      linkFilter = link => {
        let section = Object.entries(linkSections).find(([k, p]) => link.url.match(p));

        if(section) {
          result[section[0]][link.type] = link.url;
        }
        else {
          result.links[link.type] = link.url;
        }
      }
    }

    item.videos.forEach(linkFilter);
  }

  return result;
}

function getTypeId(prog, tname) {
  const result = prog.contentTypes.find(info => info.name === tname);

  return result ? result.id : undefined;
}

export default function convert(prog, {
  tzOffset = 0,
  copy = [],
  drop = [],
  types = [],
  linkSections = undefined
} = {}) {
  const
    allAuthors = new Set(),
    copyFields = new Set(copy),
    { contents: sessions, info: sessionInfo } = sessionTable(prog, tzOffset),
    people = peopleTable(prog),
    typeIds = Object.fromEntries(types.map(name => [getTypeId(prog, name), { name, seq: 0 }])),
    converted = [], tracks = [];

  prog.contents.forEach(cn => {
    if(cn.typeId in typeIds) {
      const seq = typeIds[cn.typeId].seq += 1;
      const conv = flat(cn, seq, typeIds[cn.typeId].name, copyFields, linkSections, sessions, people);

      if(drop) {
        drop.forEach(k => {
          let current = conv;
          let key = k;

          if(k instanceof Array) {
            k = k.slice();
            key = k.pop();
            k.forEach(k => current = current[k]);
          }

          delete current[key];
        });
      }

      conv.authors.forEach(a => allAuthors.add(a));
      converted.push(conv);
    }
  });

  Object.values(typeIds).forEach(({ name, seq }) => {
    if(seq > 0) {
      tracks.push(name);
    }
  })

  return {
    tracks,
    contents: converted,
    authors: [...allAuthors],
    sessions: sessionInfo,
  };
}
