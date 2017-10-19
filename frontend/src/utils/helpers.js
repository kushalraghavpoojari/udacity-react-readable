import moment from 'moment'
export const api = 'http://localhost:3001'


let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function IconMaker(name) {
  if(name !== undefined) {
    let nameArray = name.split(' ')
    let initials = nameArray.map((letter) => (
      letter.charAt(0)
    ))
    if(initials.length > 1) {
      return initials[0].toUpperCase() + initials[1].toUpperCase()
    } else {
      return initials[0].toUpperCase()
    }
  } else return 'X'
  
}

export function convertTimestamp(time) {
  return moment(time).format('LL'); 
}

export function createId() {
  function id() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return id() + id() + id() + id() + id();
}