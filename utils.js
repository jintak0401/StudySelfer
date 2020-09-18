import moment from "moment";

export const timerFormat = (secs) => {
  const h_str = "0" + parseInt(secs / 3600).toString();
  const m = parseInt((secs % 3600) / 60).toString();
  const s = parseInt(secs % 60).toString();
  const m_str = (m.length === 1 ? "0" : "") + m;
  const s_str = (s.length === 1 ? "0" : "") + s;
  return h_str + " : " + m_str + " : " + s_str;
};
