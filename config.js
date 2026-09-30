// エアコン清掃救急隊（株式会社アロー）ホームページ・申し込みページ共通の設定
// ここだけ書き換えれば、両方のページに反映されます。
window.SITE = {
  NAME: "エアコン清掃救急隊",
  COMPANY: "株式会社アロー",
  PHONE: "080-2102-7788",   // 例 "011-000-0000"。空のあいだは電話ボタンが「申し込みフォーム」に切り替わります
  EMAIL: "arrow.co.ltd21@gmail.com",   // 申し込み内容の送り先。GAS_URL が空のときは、お客様のメールアプリからこの宛先に送ります
  GAS_URL: "", // 予約管理スプレッドシート（Apps Script）につなぐ場合のURL。入れるとこちらが優先されます
  AREA: "札幌市内を中心に対応（近郊の方もご相談ください）",

  // 料金（税込）。ホームページの料金表と、申し込みページの概算の両方に使います
  PRICE: {
    tenkase: 28000,        // 業務用 天カセ・天吊 分解洗浄 1台
    tenkaseMulti: 2000,    // 2台以上で1台あたり引く額
    tenkaseCoat: 5000,     // 防カビ仕上げ
    tenkaseOutdoor: 8000,  // 室外機
    leak: 16500,           // 水漏れ・ドレン詰まり 応急対応 1回（札幌市内・営業時間内の基本料金）
    wall: 12000,           // 家庭用 壁掛け 1台
    wallMulti: 1000,       // 2台以上で1台あたり引く額
    wallAuto: 7000,        // お掃除ロボ機能付き
    wallCoat: 3000,        // 防カビ仕上げ
    wallOutdoor: 5000      // 室外機
  }
};

// 電話番号・料金を各ページに差し込む
document.addEventListener("DOMContentLoaded", () => {
  const S = window.SITE, yen = n => n.toLocaleString("ja-JP");
  document.querySelectorAll("[data-price]").forEach(el => { el.textContent = yen(S.PRICE[el.dataset.price]); });
  document.querySelectorAll(".js-tel").forEach(a => {
    if (S.PHONE) {
      a.href = "tel:" + S.PHONE.replace(/[^\d+]/g, "");
      const t = a.querySelector(".js-tel-num"); if (t) t.textContent = S.PHONE;
    } else {
      a.href = /apply\.html$/.test(location.pathname) ? "#submit" : "apply.html?type=urgent";
      const t = a.querySelector(".js-tel-num"); if (t) t.textContent = "フォームで相談";
    }
  });
  document.querySelectorAll(".js-area").forEach(el => { el.textContent = S.AREA; });
});
