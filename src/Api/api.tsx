import axios from "axios";
// export const base_url = "https://localhost:7027/";
export const base_url = "https://majles.iran.liara.run/";
export const get_sessions=(from: string, to: string) => axios.get(base_url + `api/TrVotes?from=${from}&to=${to}`);
export const get_session=(id:string) => axios.get(base_url + `api/TrVotes/GetSession?sessionId=${id}`);
export const get_member=(id:string) => axios.get(base_url + `api/TrVotes/GetMember?memId=${id}`);
export const get_firstVotes=() => axios.get(base_url + `api/TrVotes/GetFirstVotesCount`);
export const get_memberImage=(id:string) =>`${base_url}api/TrVotes/GetMemberImage/${id}`
export const red='#820014'
export const green='#52c41a'
export function getColor  (percent: any)  {

  if(percent<.5)return red;
  percent=(Math.round(percent * 100) / 100).toFixed(2);
  // return percent;
  // normalize percent to 0-1 scale
  const p = Math.min(1, Math.max(0, percent));

  // calculate mix percentage
  const w = Math.round( p * 2 - 1);

  // mix the color channels
  const r =
    (1 - w) * parseInt(red.substring(1, 3), 16) +
    w * parseInt(green.substring(1, 3), 16);
  const g =
    (1 - w) * parseInt(red.substring(3, 5), 16) +
    w * parseInt(green.substring(3, 5), 16);
  const b =
    (1 - w) * parseInt(red.substring(5, 7), 16) +
    w * parseInt(green.substring(5, 7), 16);

  // build hex color string
  return (
    "#" +
    (r|0).toString(16).padStart(2, "0") +
    (g|0).toString(16).padStart(2, "0") +
    (b|0).toString(16).padStart(2, "0")
  );
}
