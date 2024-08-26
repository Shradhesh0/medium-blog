import { atom } from "recoil";


export const loginAtom = atom({
  key:"useratom",
  default:JSON.parse(localStorage.getItem('user')||'{}')
})