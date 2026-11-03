/* Lõi website "Phòng thực hành Khoa học dữ liệu cho Lãnh đạo Sở" – không gọi máy chủ, không thu thập dữ liệu. */
var APP = {};
function $(i) { return document.getElementById(i); }
function e_(s) { return String(s === undefined || s === null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function sv(x, n) { if (x === null || x === undefined || isNaN(x)) return "—"; return Number(x).toLocaleString("vi-VN", { minimumFractionDigits: n || 0, maximumFractionDigits: n || 0 }); }
function docLS(k) { try { return localStorage.getItem("khdl_lds_" + k); } catch (e) { return null; } }
function ghiLS(k, v) { try { localStorage.setItem("khdl_lds_" + k, v); } catch (e) {} }

/* ---------------------------------------------------------------- khung trang */
var MENU = [["index.html", "Trang chủ"], ["bai.html", "Tám bài tập"], ["dat-bai-toan.html", "Đặt bài toán đúng"], ["du-lieu.html", "Bộ dữ liệu"]];
function khung(dangO) {
  var h = '<div class="dai-gl">WEBSITE GIẢ LẬP — PHỤC VỤ ĐÀO TẠO. Tỉnh Minh Khê, các Sở, xã phường và mọi số liệu đều hư cấu.</div>' +
    '<header><div class="bao"><div class="logo">GIẢ<br>LẬP</div><div><p class="ten-nho">Bồi dưỡng kiến thức nền tảng về ứng dụng công nghệ mới</p>' +
    '<p class="ten-lon">Phòng thực hành Khoa học dữ liệu cho Lãnh đạo Sở</p></div></div></header><nav><ul>';
  MENU.forEach(function (m) { h += '<li><a href="' + m[0] + '"' + (m[0] === dangO ? ' class="dang"' : "") + ">" + m[1] + "</a></li>"; });
  h += "</ul></nav>";
  var can = true; try { can = sessionStorage.getItem("khdl_da_doc") !== "1"; } catch (e) {}
  if (can) h += '<div class="gl-phu" id="glPhu"><div class="gl-hop"><h2>Đây là website giả lập, dùng để đào tạo</h2>' +
    "<p>Trang <b>không phải</b> hệ thống của bất kỳ cơ quan nào. “Tỉnh Minh Khê”, các Sở, xã, phường, cơ sở y tế, trường học, " +
    "doanh nghiệp, dự án và mọi con số đều do chương trình sinh ra.</p><ul><li>Không trích dẫn số liệu trên trang vào văn bản chính thức.</li>" +
    "<li>Trang không gửi đi và không lưu trên máy chủ bất cứ nội dung nào bạn nhập; phần trả lời chỉ lưu trong trình duyệt của bạn.</li></ul>" +
    '<button type="button" onclick="try{sessionStorage.setItem(\'khdl_da_doc\',\'1\')}catch(e){};var o=document.getElementById(\'glPhu\');o.parentNode.removeChild(o)">Tôi đã hiểu, tiếp tục</button></div></div>';
  document.write(h);
}
function chan() {
  document.write('<footer><div class="bao"><div><b>Phòng thực hành Khoa học dữ liệu cho Lãnh đạo Sở</b>Website giả lập đi kèm khoá ' +
    "bồi dưỡng kiến thức nền tảng về ứng dụng công nghệ mới.<br>Giảng viên: TS. Nguyễn Ngọc Trường Minh</div>" +
    "<div><b>Lưu ý</b>Mọi địa danh, cơ quan, số liệu là hư cấu. Ngưỡng, thời hạn trong bài là giả định để thực hành, " +
    "không thay cho quy định hiện hành.</div></div></footer>");
}

/* --------------------------------------------------------------- đọc CSV nhúng */
function docCSV(t) {
  var d = [], dong = [], o = "", q = false;
  for (var i = 0; i < t.length; i++) {
    var c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { o += '"'; i++; } else q = false; } else o += c; }
    else if (c === '"') q = true;
    else if (c === ",") { dong.push(o); o = ""; }
    else if (c === "\n") { dong.push(o); d.push(dong); dong = []; o = ""; }
    else if (c !== "\r") o += c;
  }
  if (o !== "" || dong.length) { dong.push(o); d.push(dong); }
  var cot = d.shift().map(function (x) { return x.replace(/^﻿/, ""); });
  return d.filter(function (r) { return r.length === cot.length; }).map(function (r) {
    var o2 = {}; cot.forEach(function (k, j) { var v = r[j]; o2[k] = (v !== "" && !isNaN(v) && !/^0\d/.test(v)) ? Number(v) : v; }); return o2; });
}
var DL_CACHE = {};
function duLieu(ten) { if (!DL_CACHE[ten]) DL_CACHE[ten] = docCSV(window.CSV[ten]); return DL_CACHE[ten]; }

/* --------------------------------------------------------------- bảng tổng hợp */
function tinhChiTieu(ds, ct) {
  if (ct.kieu === "dem") return ds.length;
  var tong = 0, n = 0, t2 = 0;
  ds.forEach(function (r) { var v = Number(r[ct.truong]); if (!isNaN(v) && r[ct.truong] !== "") { tong += v; n++; }
    if (ct.kieu === "ty_so") t2 += Number(r[ct.mau]) || 0; });
  if (ct.kieu === "tong") return tong;
  if (ct.kieu === "tb") return n ? tong / n : NaN;
  if (ct.kieu === "ty_le") return n ? tong / n * 100 : NaN;
  if (ct.kieu === "ty_so") return t2 ? tong / t2 * 100 : NaN;
  return NaN;
}
function locDS(ds, loc) {
  return ds.filter(function (r) { return (loc || []).every(function (l) { return !l[0] || String(r[l[0]]) === String(l[1]); }); });
}
function nhomGT(ds, k) { var m = {}, thu = []; ds.forEach(function (r) { var v = String(r[k]); if (!(v in m)) { m[v] = []; thu.push(v); } m[v].push(r); });
  thu.sort(function (a, b) { return isNaN(a) || isNaN(b) ? a.localeCompare(b, "vi") : Number(a) - Number(b); }); return { m: m, thu: thu }; }

/* Bộ công cụ phân tích gắn vào một phần tử */
function CongCu(goc, bai) {
  this.goc = goc; this.bai = bai; this.dung();
}
CongCu.prototype.dung = function () {
  var self = this, b = this.bai;
  this.goc.innerHTML = '<div class="hang-dk">' +
    '<div><label>Bộ dữ liệu</label><select data-k="ds"></select></div>' +
    '<div><label>Hàng (nhóm theo)</label><select data-k="hang"></select></div>' +
    '<div><label>Cột (chia thêm theo)</label><select data-k="cot"></select></div>' +
    '<div><label>Chỉ tiêu</label><select data-k="ct"></select></div></div>' +
    '<div class="hang-dk"><div><label>Lọc 1</label><select data-k="l1k"></select> <select data-k="l1v"></select></div>' +
    '<div><label>Lọc 2</label><select data-k="l2k"></select> <select data-k="l2v"></select></div>' +
    '<div><button type="button" class="phu" data-k="tai">Tải bảng kết quả (CSV)</button></div></div>' +
    '<div class="khung-bang" data-k="bang"></div><div class="bieu-do" data-k="bd"></div><p class="nho" data-k="ghi"></p>';
  this.o = {}; Array.prototype.forEach.call(this.goc.querySelectorAll("[data-k]"), function (x) { self.o[x.getAttribute("data-k")] = x; });
  b.du_lieu.forEach(function (d) { self.o.ds.appendChild(new Option(d.ten, d.ma)); });
  ["ds", "hang", "cot", "ct", "l1k", "l1v", "l2k", "l2v"].forEach(function (k) {
    self.o[k].onchange = function () { if (k === "ds") self.napDS(); if (k === "l1k" || k === "l2k") self.napGT(k); self.ve(); }; });
  this.o.tai.onclick = function () { self.taiVe(); };
  this.napDS();
};
CongCu.prototype.dsHien = function () { var m = this.o.ds.value; return this.bai.du_lieu.filter(function (d) { return d.ma === m; })[0]; };
CongCu.prototype.napDS = function () {
  var d = this.dsHien(), o = this.o;
  [o.hang, o.cot, o.l1k, o.l2k, o.ct].forEach(function (s) { s.innerHTML = ""; });
  o.cot.appendChild(new Option("(không chia)", "")); o.l1k.appendChild(new Option("(không lọc)", "")); o.l2k.appendChild(new Option("(không lọc)", ""));
  d.chieu.forEach(function (c) { [o.hang, o.cot, o.l1k, o.l2k].forEach(function (s) { s.appendChild(new Option(c[1], c[0])); }); });
  d.chi_tieu.forEach(function (c, i) { o.ct.appendChild(new Option(c.ten, String(i))); });
  this.napGT("l1k"); this.napGT("l2k"); this.ve();
};
CongCu.prototype.napGT = function (k) {
  var d = this.dsHien(), s = this.o[k === "l1k" ? "l1v" : "l2v"], tr = this.o[k].value; s.innerHTML = "";
  if (!tr) { s.style.display = "none"; return; } s.style.display = "";
  nhomGT(duLieu(d.ma), tr).thu.forEach(function (v) { s.appendChild(new Option(v, v)); });
};
CongCu.prototype.datCauHinh = function (ch) {
  var o = this.o; o.ds.value = ch.du_lieu; this.napDS();
  o.hang.value = ch.hang; o.cot.value = ch.cot || ""; o.ct.value = String(ch.chi_tieu);
  var l = ch.loc || [];
  o.l1k.value = l[0] ? l[0][0] : ""; this.napGT("l1k"); if (l[0]) o.l1v.value = String(l[0][1]);
  o.l2k.value = l[1] ? l[1][0] : ""; this.napGT("l2k"); if (l[1]) o.l2v.value = String(l[1][1]);
  this.ve(); this.goc.scrollIntoView({ behavior: "smooth", block: "start" });
};
CongCu.prototype.tinh = function () {
  var d = this.dsHien(), o = this.o, ct = d.chi_tieu[Number(o.ct.value)];
  var loc = [[o.l1k.value, o.l1v.value], [o.l2k.value, o.l2v.value]];
  var ds = locDS(duLieu(d.ma), loc);
  var H = nhomGT(ds, o.hang.value), C = o.cot.value ? nhomGT(ds, o.cot.value) : { thu: ["__"], m: { "__": ds } };
  var bang = H.thu.map(function (h) { return { h: h, v: C.thu.map(function (c) {
      var con = H.m[h].filter(function (r) { return !o.cot.value || String(r[o.cot.value]) === c; }); return con.length ? tinhChiTieu(con, ct) : NaN; }) }; });
  var tong = C.thu.map(function (c) { return tinhChiTieu(o.cot.value ? C.m[c] : ds, ct); });
  return { d: d, ct: ct, ds: ds, H: H, C: C, bang: bang, tong: tong };
};
CongCu.prototype.ve = function () {
  var k = this.tinh(), o = this.o, le = k.ct.le === undefined ? 1 : k.ct.le, dv = k.ct.don_vi || "";
  var chia = !!o.cot.value, ttr = !chia && (k.ct.kieu === "dem" || k.ct.kieu === "tong");
  var h = "<table><thead><tr><th>" + e_(o.hang.options[o.hang.selectedIndex].text) + "</th>" +
    k.C.thu.map(function (c) { return '<th class="so">' + e_(chia ? c : k.ct.ten) + "</th>"; }).join("") + (ttr ? '<th class="so">Tỷ trọng</th>' : "") + "</tr></thead><tbody>";
  k.bang.forEach(function (r) { h += "<tr><td>" + e_(r.h) + "</td>" + r.v.map(function (v) { return '<td class="so">' + sv(v, le) + "</td>"; }).join("") +
    (ttr ? '<td class="so">' + sv(r.v[0] / k.tong[0] * 100, 1) + "%</td>" : "") + "</tr>"; });
  h += '<tr class="tong"><td>Chung (theo bộ lọc)</td>' + k.tong.map(function (v) { return '<td class="so">' + sv(v, le) + "</td>"; }).join("") + (ttr ? '<td class="so">100%</td>' : "") + "</tr></tbody></table>";
  o.bang.innerHTML = h;
  o.ghi.textContent = "Số dòng dữ liệu sau khi lọc: " + sv(k.ds.length) + ". Chỉ tiêu: " + k.ct.ten + (dv ? " (" + dv + ")" : "") + ".";
  this.veBD(k);
};
CongCu.prototype.veBD = function (k) {
  var MAU = ["#1F5F99", "#C55A11", "#2E7D4F", "#7B4FA3", "#B03A48", "#5B6470"];
  var nh = k.bang.map(function (r) { return r.h; }), sc = k.C.thu.length, n = nh.length;
  if (n > 30) { this.o.bd.innerHTML = '<p class="nho">Quá nhiều nhóm để vẽ biểu đồ – xem bảng.</p>'; return; }
  var W = 900, L = 230, R = 70, hD = Math.max(18, 14 * sc + 6), H = n * hD + 30, max = 0;
  k.bang.forEach(function (r) { r.v.forEach(function (v) { if (!isNaN(v) && v > max) max = v; }); });
  max = max || 1;
  var s = ['<svg viewBox="0 0 ' + W + " " + H + '" role="img">'];
  k.bang.forEach(function (r, i) {
    var y = 6 + i * hD;
    s.push('<text x="' + (L - 8) + '" y="' + (y + hD / 2 + 4) + '" text-anchor="end" font-size="12.5" fill="#333">' + e_(String(r.h).slice(0, 34)) + "</text>");
    r.v.forEach(function (v, j) { if (isNaN(v)) return; var w = Math.max(0, v) / max * (W - L - R), yy = y + 2 + j * 14;
      s.push('<rect x="' + L + '" y="' + yy + '" width="' + w.toFixed(1) + '" height="12" fill="' + MAU[j % 6] + '"/>');
      s.push('<text x="' + (L + w + 5).toFixed(1) + '" y="' + (yy + 10) + '" font-size="11.5" fill="#12355B">' + sv(v, k.ct.le === undefined ? 1 : k.ct.le) + "</text>"); });
  });
  if (sc > 1) k.C.thu.forEach(function (c, j) { s.push('<rect x="' + (L + j * 210) + '" y="' + (H - 14) + '" width="12" height="10" fill="' + MAU[j % 6] + '"/><text x="' + (L + 16 + j * 210) + '" y="' + (H - 5) + '" font-size="12">' + e_(c.slice(0, 28)) + "</text>"); });
  s.push("</svg>"); this.o.bd.innerHTML = s.join("");
};
CongCu.prototype.taiVe = function () {
  var k = this.tinh(), dong = [[this.o.hang.options[this.o.hang.selectedIndex].text].concat(k.C.thu.map(function (c) { return c === "__" ? k.ct.ten : c; }))];
  k.bang.forEach(function (r) { dong.push([r.h].concat(r.v.map(function (v) { return isNaN(v) ? "" : Math.round(v * 100) / 100; }))); });
  var t = "﻿" + dong.map(function (r) { return r.map(function (x) { x = String(x); return /[",\n]/.test(x) ? '"' + x.replace(/"/g, '""') + '"' : x; }).join(","); }).join("\n");
  var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([t], { type: "text/csv;charset=utf-8" }));
  a.download = "bang_tong_hop_" + this.bai.ma + ".csv"; document.body.appendChild(a); a.click(); document.body.removeChild(a);
};

/* ----------------------------------------------------------- kiểm tra đáp số */
function kiemTra(bai, i) {
  var nv = bai.nhiem_vu[i], o = $("kq_" + i), g = $("giai_" + i), dung = false;
  if (nv.kieu === "so") {
    var s = String($("tl_" + i).value).trim().replace(/\s|%/g, "");
    if (s.indexOf(",") >= 0) s = s.replace(/\./g, "").replace(",", ".");          /* 2.329,5 hoặc 12,5 */
    else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");           /* 2.329 = hai nghìn ba trăm hai chín */
    var v = Number(s);
    dung = !isNaN(v) && Math.abs(v - nv.dap_an) <= nv.sai_so;
  } else { var c = document.querySelector('input[name="tl_' + i + '"]:checked'); dung = !!c && c.value === nv.dap_an; }
  var lan = Number(docLS(bai.ma + "_lan_" + i) || 0) + 1; ghiLS(bai.ma + "_lan_" + i, String(lan));
  o.className = "kq " + (dung ? "dung" : "sai");
  o.textContent = dung ? "✓ Chính xác." : (lan >= 2 ? "✗ Chưa đúng – xem gợi ý cấu hình, hoặc bấm “Xem đáp án”." : "✗ Chưa đúng – thử lại với bảng phân tích.");
  if (dung) g.className = "giai hien";
}
function xemDapAn(i) { $("giai_" + i).className = "giai hien"; }
