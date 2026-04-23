import { useState } from "react";

const COLORS = {
  bg: "#0f0f0f",
  card: "#1a1a1a",
  cardHover: "#222",
  accent: "#c9a44a",
  accentDim: "#8a7030",
  green: "#4ade80",
  red: "#f87171",
  text: "#e8e8e8",
  muted: "#888",
  border: "#2a2a2a",
  highlight: "#c9a44a18",
};

function Section({ title, icon, children, accent }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: "24px 28px",
        marginBottom: 20,
        borderLeft: accent ? `3px solid ${COLORS.accent}` : undefined,
      }}
    >
      <h2
        style={{
          margin: "0 0 16px 0",
          fontSize: 15,
          fontWeight: 600,
          color: COLORS.accent,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontFamily: "'JetBrains Mono', monospace",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 18 }}>{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}

function Row({ label, value, bold, color, indent, sub }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: `${sub ? 4 : 7}px 0`,
        paddingLeft: indent ? 16 : 0,
        borderBottom: sub ? "none" : `1px solid ${COLORS.border}22`,
      }}
    >
      <span
        style={{
          color: sub ? COLORS.muted : COLORS.text,
          fontSize: sub ? 13 : 14,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: color || (bold ? COLORS.accent : COLORS.text),
          fontWeight: bold ? 700 : 400,
          fontSize: bold ? 16 : sub ? 13 : 14,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Badge({ children, color }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: `${color}20`,
        color: color,
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "'JetBrains Mono', monospace",
        border: `1px solid ${color}40`,
      }}
    >
      {children}
    </span>
  );
}

export default function CardShopBusinessPlan() {
  const [sellPrice, setSellPrice] = useState(43);
  const [boxCost, setBoxCost] = useState(560);
  const [shippingCost, setShippingCost] = useState(5.3);

  const packsPerBox = 24;
  const costPerPack = boxCost / packsPerBox;

  // Colorado Springs combined sales tax
  const salesTaxRate = 0.082;

  // eBay collects tax from buyer, but FVF is charged on total including tax
  const buyerPaysTotal = sellPrice; // listing price (free shipping)
  const salesTaxOnSale = buyerPaysTotal * salesTaxRate;
  const totalBuyerPays = buyerPaysTotal + salesTaxOnSale;

  // eBay fees: 13.25% FVF on total (item + shipping + tax) + $0.40 per order
  const fvfRate = 0.1325;
  const fvf = totalBuyerPays * fvfRate;
  const perOrderFee = 0.4;
  const totalEbayFees = fvf + perOrderFee;

  // Your payout from eBay = buyer total - eBay fees - sales tax (eBay remits tax)
  const payoutPerPack = totalBuyerPays - totalEbayFees - salesTaxOnSale;

  // Costs per pack
  const totalCostPerPack = costPerPack + shippingCost;

  // Profit per pack
  const profitPerPack = payoutPerPack - totalCostPerPack;
  const profitMargin = (profitPerPack / sellPrice) * 100;

  // Box-level
  const totalRevenue = payoutPerPack * packsPerBox;
  const totalCosts = totalCostPerPack * packsPerBox;
  const totalProfit = profitPerPack * packsPerBox;
  const roi = (totalProfit / boxCost) * 100;

  const isProfitable = profitPerPack > 0;

  // ===== INVESTMENT #2: Seller's Bundle =====
  const [bundlePrice, setBundlePrice] = useState(24.99);
  const [bundleShipping, setBundleShipping] = useState(7.3);

  // Wholesale sourcing costs (buying 1000ct bulk, splitting into 100ct bundles = 10 bundles)
  // BCW Penny Sleeves: ~$15.99/1000 on eBay (bulk qty discount ~$12.79 at 4+)
  // Cardboard Gold/Ultra Pro Toploaders: ~$79.99/1000 on eBay (incl. sleeves from Columbia Hobby)
  // BCW Team Bags: ~$18-22/1000 on eBay (~$2/100ct)
  const toploader1000Cost = 79.99;
  const pennySleeve1000Cost = 12.79; // bulk 4+ discount price
  const teamBag1000Cost = 20.00;
  const bundlesPerCase = 10; // 1000 ÷ 100 per bundle

  const totalSourceCost = toploader1000Cost + pennySleeve1000Cost + teamBag1000Cost;
  const costPerBundle = totalSourceCost / bundlesPerCase;

  // Per-unit costs
  const costPerToploader = toploader1000Cost / 1000;
  const costPerSleeve = pennySleeve1000Cost / 1000;
  const costPerTeamBag = teamBag1000Cost / 1000;

  // eBay fees on bundle (same 13.25% FVF + $0.40, on total incl tax)
  // eBay category for supplies is "Trading Card Accessories" which falls under standard 13.25%
  const bundleTax = bundlePrice * salesTaxRate;
  const bundleBuyerTotal = bundlePrice + bundleTax;
  const bundleFvf = bundleBuyerTotal * fvfRate;
  const bundleEbayFees = bundleFvf + perOrderFee;
  const bundlePayout = bundleBuyerTotal - bundleEbayFees - bundleTax;

  const bundleTotalCost = costPerBundle + bundleShipping;
  const bundleProfitPer = bundlePayout - bundleTotalCost;
  const bundleMargin = (bundleProfitPer / bundlePrice) * 100;
  const bundleTotalProfit = bundleProfitPer * bundlesPerCase;
  const bundleRoi = (bundleTotalProfit / totalSourceCost) * 100;
  const bundleProfitable = bundleProfitPer > 0;

  // Grand totals across both investments
  // (will be updated below after inv3)

  // ===== INVESTMENT #3: Pokémon My First Battle =====
  const mfbBoxCost = 23.76;
  const mfbQty = 4;
  const mfbTotalInv = mfbBoxCost * mfbQty;

  // Helper: calculate eBay payout for a given listing price
  const ebayPayout = (price) => {
    const tax = price * salesTaxRate;
    const buyerTotal = price + tax;
    const fvfAmt = buyerTotal * fvfRate;
    const orderFee = price > 10 ? 0.40 : 0.30;
    return buyerTotal - fvfAmt - orderFee - tax;
  };

  // B&P singles breakdown
  const bpCards = [
    { name: "Blue Border Pikachu", price: 25.00, shipCost: 1.27 },
    { name: "Blue Border Bulbasaur", price: 15.00, shipCost: 1.27 },
    { name: "Bulbasaur", price: 13.00, shipCost: 1.27 },
    { name: "Pikachu", price: 12.50, shipCost: 1.27 },
    { name: "Blue Border Lightning Energy", price: 1.40, shipCost: 0.68 },
    { name: "Blue Border Grass Energy", price: 1.25, shipCost: 0.68 },
  ];
  const bpSinglesNet = bpCards.reduce((sum, c) => sum + ebayPayout(c.price) - c.shipCost, 0);
  const bpSinglesProfit = bpSinglesNet - mfbBoxCost;

  // C&S singles breakdown
  const csCards = [
    { name: "Blue Border Squirtle", price: 15.00, shipCost: 1.27 },
    { name: "Blue Border Charmander", price: 12.00, shipCost: 1.27 },
    { name: "Arcanine", price: 11.00, shipCost: 1.27 },
    { name: "Squirtle", price: 10.00, shipCost: 1.27 },
    { name: "Magikarp", price: 10.00, shipCost: 1.27 },
    { name: "Gyarados", price: 6.50, shipCost: 1.27 },
    { name: "Charmander", price: 5.80, shipCost: 1.27 },
    { name: "Ninetales", price: 5.50, shipCost: 1.27 },
    { name: "Growlithe", price: 3.50, shipCost: 0.68 },
    { name: "Lapras", price: 3.25, shipCost: 0.68 },
    { name: "Wartortle", price: 2.00, shipCost: 0.68 },
    { name: "Blue Border Water Energy", price: 1.60, shipCost: 0.68 },
    { name: "Vulpix", price: 1.50, shipCost: 0.68 },
  ];
  const csSinglesNet = csCards.reduce((sum, c) => sum + ebayPayout(c.price) - c.shipCost, 0);
  const csSinglesProfit = csSinglesNet - mfbBoxCost;

  // Scenarios for 4 boxes — all break for singles now
  const mfbScenarios = [
    { label: "4× B&P", bp: 4, cs: 0 },
    { label: "3× B&P + 1× C&S", bp: 3, cs: 1 },
    { label: "2× B&P + 2× C&S", bp: 2, cs: 2 },
    { label: "1× B&P + 3× C&S", bp: 1, cs: 3 },
    { label: "4× C&S", bp: 0, cs: 4 },
  ];
  const mfbScenarioProfit = (bp, cs) => bpSinglesProfit * bp + csSinglesProfit * cs;

  // Expected value (equal probability across 5 outcomes)
  const mfbExpectedProfit = mfbScenarios.reduce((s, sc) => s + mfbScenarioProfit(sc.bp, sc.cs), 0) / mfbScenarios.length;
  const mfbProfitable = mfbExpectedProfit > 0;
  const mfbBestProfit = Math.max(...mfbScenarios.map(s => mfbScenarioProfit(s.bp, s.cs)));
  const mfbWorstProfit = Math.min(...mfbScenarios.map(s => mfbScenarioProfit(s.bp, s.cs)));

  // ===== TRACKING STATE =====
  // Shop metrics
  const shopOrders = 75;
  const shopReviews = 40;
  const shopNegative = 0;

  // Realized sales log — all figures are ACTUAL PAYOUTS (after eBay fees + shipping)
  const realizedSales = [
    { inv: 1, item: "Jet Medallion (CM)", payout: 8.39, date: "Apr 2026" },
    { inv: 1, item: "Freyalise, Llanowar's Fury (CM)", payout: 3.24, date: "Apr 2026" },
    { inv: 3, item: "2× BB Squirtle + 2× Reg Squirtle (MFB bundle)", payout: 28.35, date: "Apr 2026" },
    { inv: 0, item: "Pokémon Ranger Steam Siege", payout: 3.66, date: "Apr 2026" },
    { inv: 1, item: "Cyclonic Rift (CM)", payout: 21.93, date: "Apr 2026" },
    { inv: 3, item: "Blue Border Charmander (MFB)", payout: 7.45, date: "Apr 2026" },
    { inv: 3, item: "Reg Border Charmander (MFB)", payout: 4.11, date: "Apr 2026" },
    { inv: 1, item: "Grand Abolisher (CM)", payout: 12.60, date: "Apr 2026" },
  ];
  const totalRealized = realizedSales.reduce((s, r) => s + r.payout, 0);

  // Investment #1: Commander Masters — PIVOTED to singles
  const inv1Cost = 560;
  const inv1Realized = realizedSales.filter(r => r.inv === 1).reduce((s, r) => s + r.payout, 0);

  // Full pull list with estimated market values (TCGPlayer/MTGGoldfish mid-market 2026)
  const cmPulls = [
    // $30+ tier
    { name: "Deflecting Swat (borderless)", est: 88, sold: false },
    { name: "The Great Henge", est: 42, sold: false },
    { name: "Deflecting Swat (regular)", est: 36, sold: false },
    { name: "Craterhoof Behemoth", est: 30, sold: false },
    { name: "Urza, Lord High Artificer", est: 28, sold: false },
    // $10-29 tier
    { name: "Loyal Retainers", est: 22, sold: false },
    { name: "Smothering Tithe", est: 18, sold: false },
    { name: "Morophon, the Boundless", est: 17, sold: false },
    { name: "Cyclonic Rift", est: 17, sold: true },
    { name: "Toxic Deluge", est: 16, sold: false },
    { name: "Grand Abolisher", est: 13, sold: true },
    { name: "Mikaeus, the Unhallowed (BL holo)", est: 15, sold: false },
    { name: "Ohran Frostfang", est: 12, sold: false },
    { name: "Gisela, Blade of Goldnight", est: 12, sold: false },
    { name: "Counterspell (BL holo)", est: 11, sold: false },
    { name: "Bloodchief Ascension", est: 11, sold: false },
    { name: "Arachnogenesis", est: 10, sold: false },
    { name: "Sol Ring (holo)", est: 10, sold: false },
    // $5-9 tier
    { name: "Exsanguinate (holo)", est: 8, sold: false },
    { name: "Imp's Mischief", est: 8, sold: false },
    { name: "Jet Medallion", est: 8.39, sold: true },
    { name: "Sapphire Medallion", est: 7, sold: false },
    { name: "Wrath of God", est: 7, sold: false },
    { name: "Path to Exile (BL)", est: 6, sold: false },
    { name: "Path to Exile", est: 5, sold: false },
    { name: "Ghalta, Primal Hunger", est: 5, sold: false },
    { name: "Nekusar, the Mindrazer", est: 6, sold: false },
    { name: "Skyline Despot", est: 6, sold: false },
    { name: "Disrupt Decorum", est: 5, sold: false },
    { name: "Personal Tutor (BL)", est: 6, sold: false },
    { name: "Treasure Nabber", est: 5, sold: false },
    { name: "Hammer of Nazahn", est: 5, sold: false },
    { name: "Sephara, Sky's Blade", est: 5, sold: false },
    { name: "Godo, Bandit Warlord", est: 5, sold: false },
    { name: "Sevinne's Reclamation", est: 5, sold: false },
    // $2-4 tier
    { name: "Meren of Clan Nel Toth (BL)", est: 4, sold: false },
    { name: "Meren of Clan Nel Toth", est: 3, sold: false },
    { name: "Xantcha, Sleeper Agent", est: 4, sold: false },
    { name: "Sidisi, Brood Tyrant", est: 3, sold: false },
    { name: "Akiri, Fearless Voyager", est: 3, sold: false },
    { name: "Counterspell (BL) x2", est: 6, sold: false },
    { name: "Counterspell (regular)", est: 2, sold: false },
    { name: "Frantic Search (BL) x2", est: 4, sold: false },
    { name: "Frantic Search", est: 2, sold: false },
    { name: "Storm-Kiln Artist (BL)", est: 3, sold: false },
    { name: "Vandalblast (BL)", est: 3, sold: false },
    { name: "Vandalblast", est: 2, sold: false },
    { name: "Generous Gift (BL)", est: 3, sold: false },
    { name: "Generous Gift", est: 2, sold: false },
    { name: "Faithful Looting (BL)", est: 2, sold: false },
    { name: "All That Glitters (BL)", est: 3, sold: false },
    { name: "Dread Return (BL)", est: 2, sold: false },
    { name: "Victimize", est: 2, sold: false },
    { name: "Eternal Witness", est: 2, sold: false },
    { name: "Mystic Confluence", est: 3, sold: false },
    { name: "Kodama's Reach (BL)", est: 2, sold: false },
    { name: "Kodama's Reach", est: 2, sold: false },
    { name: "Sublime Exhalation", est: 2, sold: false },
    { name: "Darksteel Mutation", est: 2, sold: false },
    { name: "Elvish Mystic (BL holo)", est: 3, sold: false },
    { name: "Elvish Mystic (BL)", est: 2, sold: false },
    { name: "Elvish Mystic", est: 2, sold: false },
    { name: "Skyshroud Claim", est: 2, sold: false },
    { name: "Star of Extinction", est: 2, sold: false },
    { name: "Idol of Oblivion", est: 2, sold: false },
    { name: "Spectator Seating", est: 3, sold: false },
    { name: "Undergrowth Stadium", est: 3, sold: false },
    { name: "Pathrazer of Ulamog", est: 2, sold: false },
    { name: "Freyalise, Llanowar's Fury", est: 3.24, sold: true },
    // $1-2 tier (misc)
    { name: "Other sub-$2 cards + tokens/lands/art cards", est: 15, sold: false },
  ];

  const cmUnsold = cmPulls.filter(c => !c.sold);
  const inv1UnrealizedEstimate = Math.round(cmUnsold.reduce((s, c) => s + c.est, 0));
  const inv1TotalEstimate = inv1Realized + inv1UnrealizedEstimate;
  const inv1RecoupPct = Math.min(100, (inv1TotalEstimate / inv1Cost) * 100);
  const inv1Status = "active";
  const cmTotalCards = cmPulls.length;
  const cmSoldCards = cmPulls.filter(c => c.sold).length;

  // Investment #2: Seller's Bundles
  const inv2Status = "planned";

  // Investment #3: MFB — received 4× C&S, breaking for singles
  const inv3Cost = 23.76 * 4;
  const inv3Realized = realizedSales.filter(r => r.inv === 3).reduce((s, r) => s + r.payout, 0);
  const inv3UnrealizedEstimate = csSinglesNet * 4 - inv3Realized - 28.35; // remaining unsold C&S singles across 4 sets minus what sold
  const inv3TotalEstimate = inv3Realized + Math.max(0, inv3UnrealizedEstimate);
  const inv3RecoupPct = Math.min(100, (inv3TotalEstimate / inv3Cost) * 100);
  const inv3Status = "active";
  const inv4Status = "planned";

  // ===== INVESTMENT #4: TCG Accessories =====
  const sellRateAcc = 0.80;
  const accItems = [
    { name: "Ultra Pro 9-pocket binder", cost: 10, sell: 22, ship: 6.50, qty: 3 },
    { name: "Ultra Pro deck box", cost: 4, sell: 10, ship: 5.30, qty: 5 },
    { name: "Generic playmat (bulk)", cost: 7.50, sell: 24, ship: 6.50, qty: 3 },
    { name: "BCW 800ct storage box", cost: 3, sell: 10, ship: 5.30, qty: 4 },
  ];
  const accInvestment = accItems.reduce((s, i) => s + i.cost * i.qty, 0);
  const accTotalUnits = accItems.reduce((s, i) => s + i.qty, 0);
  const accTotalProfit = accItems.reduce((s, item) => {
    const p = ebayPayout(item.sell);
    const profitPer = (p - item.cost - item.ship) * sellRateAcc;
    return s + profitPer * item.qty;
  }, 0);
  const accRoi = (accTotalProfit / accInvestment) * 100;
  const accProfitable = accTotalProfit > 0;

  // Grand totals across ALL investments
  const grandCapital = boxCost + (shippingCost * packsPerBox) + totalSourceCost + (bundleShipping * bundlesPerCase) + mfbTotalInv + accInvestment;
  const grandProfitBest = totalProfit + bundleTotalProfit + mfbBestProfit + accTotalProfit;
  const grandProfitWorst = totalProfit + bundleTotalProfit + mfbWorstProfit + accTotalProfit;
  const grandProfitExpected = totalProfit + bundleTotalProfit + mfbExpectedProfit + accTotalProfit;

  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        color: COLORS.text,
        fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
        padding: "32px 20px",
        maxWidth: 640,
        margin: "0 auto",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            color: COLORS.muted,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Business Plan v3.0
        </div>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: COLORS.accent,
            margin: "0 0 4px 0",
            lineHeight: 1.2,
          }}
        >
          Card Shop Investment Plan
        </h1>
        <div style={{ fontSize: 13, color: COLORS.muted }}>
          4 Investments · MTG · Pokémon · Supplies · Accessories
        </div>
      </div>

      {/* Status Bar */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 24,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Badge color={isProfitable ? COLORS.green : COLORS.red}>
          {isProfitable ? "✓ INV.1" : "✗ INV.1"}
        </Badge>
        <Badge color={bundleProfitable ? COLORS.green : COLORS.red}>
          {bundleProfitable ? "✓ INV.2" : "✗ INV.2"}
        </Badge>
        <Badge color={COLORS.green}>✓ INV.3</Badge>
        <Badge color={accProfitable ? COLORS.green : COLORS.red}>
          {accProfitable ? "✓ INV.4" : "✗ INV.4"}
        </Badge>
        <Badge color={COLORS.accent}>
          EXPECTED: +${grandProfitExpected.toFixed(0)}
        </Badge>
      </div>

      {/* ===== TRACKING DASHBOARD ===== */}
      <Section title="Investment Tracker" icon="📡">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10, marginBottom: 16 }}>
          <div style={{ background: COLORS.bg, borderRadius: 8, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: COLORS.muted }}>Orders</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.accent, fontFamily: "'JetBrains Mono', monospace" }}>{shopOrders}</div>
          </div>
          <div style={{ background: COLORS.bg, borderRadius: 8, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: COLORS.muted }}>Reviews</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.green, fontFamily: "'JetBrains Mono', monospace" }}>{shopReviews}</div>
            <div style={{ fontSize: 10, color: COLORS.green }}>100% positive</div>
          </div>
          <div style={{ background: COLORS.bg, borderRadius: 8, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: COLORS.muted }}>Realized revenue</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, fontFamily: "'JetBrains Mono', monospace" }}>${totalRealized.toFixed(2)}</div>
          </div>
        </div>

        {/* Inv 1: Commander Masters — now singles */}
        <div style={{
          padding: "14px 16px", marginBottom: 10, borderRadius: 8,
          background: COLORS.bg, border: `1px solid ${COLORS.border}`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>📦</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, fontFamily: "'JetBrains Mono', monospace" }}>
                Inv. #1 — Commander Masters Singles
              </span>
            </div>
            <Badge color={COLORS.green}>ACTIVE</Badge>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>
            <span>Pivoted to singles ✓</span>
            <span>Sold: ${inv1Realized.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{ flex: 1, height: 6, background: COLORS.border, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${inv1RecoupPct}%`, height: "100%", background: inv1RecoupPct >= 100 ? COLORS.green : COLORS.accent, borderRadius: 3 }} />
            </div>
            <span style={{ fontSize: 12, color: inv1RecoupPct >= 100 ? COLORS.green : COLORS.accent, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, minWidth: 70, textAlign: "right" }}>
              {inv1RecoupPct.toFixed(0)}% recoup
            </span>
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted }}>
            ${inv1Realized.toFixed(2)} realized + ~${inv1UnrealizedEstimate} estimated unsold = ~${inv1TotalEstimate.toFixed(0)} of ${inv1Cost} cost
          </div>
        </div>

        {/* Inv 2: Seller's Bundles */}
        <div style={{
          padding: "14px 16px", marginBottom: 10, borderRadius: 8,
          background: COLORS.bg, border: `1px solid ${COLORS.border}`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>🎯</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, fontFamily: "'JetBrains Mono', monospace" }}>
                Inv. #2 — Seller's Bundles
              </span>
            </div>
            <Badge color={COLORS.muted}>PLANNED</Badge>
          </div>
          <div style={{ fontSize: 12, color: COLORS.muted }}>
            Not yet sourced · 1000ct cases of toploaders, sleeves & team bags
          </div>
        </div>

        {/* Inv 3: My First Battle — now active with real data */}
        <div style={{
          padding: "14px 16px", marginBottom: 10, borderRadius: 8,
          background: COLORS.bg, border: `1px solid ${COLORS.border}`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>⚡</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, fontFamily: "'JetBrains Mono', monospace" }}>
                Inv. #3 — My First Battle (4× C&S)
              </span>
            </div>
            <Badge color={COLORS.green}>ACTIVE</Badge>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>
            <span>Received 4× C&S ✓</span>
            <span>Sold: ${inv3Realized.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{ flex: 1, height: 6, background: COLORS.border, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${inv3RecoupPct}%`, height: "100%", background: inv3RecoupPct >= 100 ? COLORS.green : COLORS.accent, borderRadius: 3 }} />
            </div>
            <span style={{ fontSize: 12, color: inv3RecoupPct >= 100 ? COLORS.green : COLORS.accent, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, minWidth: 70, textAlign: "right" }}>
              {inv3RecoupPct.toFixed(0)}% recoup
            </span>
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted }}>
            ${inv3Realized.toFixed(2)} realized + ~${Math.max(0, inv3UnrealizedEstimate).toFixed(0)} estimated unsold = ~${inv3TotalEstimate.toFixed(0)} of ${inv3Cost.toFixed(2)} cost
          </div>
        </div>
      </Section>

      {/* ===== REALIZED SALES LOG ===== */}
      <Section title="Realized Sales Log" icon="💵">
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12 }}>
          Confirmed sales with actual payout amounts received.
        </div>
        {realizedSales.map((s, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 0", borderBottom: i < realizedSales.length - 1 ? `1px solid ${COLORS.border}22` : "none",
          }}>
            <div>
              <div style={{ fontSize: 13, color: COLORS.text, fontFamily: "'JetBrains Mono', monospace" }}>{s.item}</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>Inv. #{s.inv} · {s.date}</div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.green, fontFamily: "'JetBrains Mono', monospace" }}>
              +${s.payout.toFixed(2)}
            </span>
          </div>
        ))}
        <div style={{
          marginTop: 12, padding: "10px 14px",
          background: `${COLORS.green}10`, border: `1px solid ${COLORS.green}30`, borderRadius: 8,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.green, fontFamily: "'JetBrains Mono', monospace" }}>
            TOTAL REALIZED
          </span>
          <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.green, fontFamily: "'JetBrains Mono', monospace" }}>
            +${totalRealized.toFixed(2)}
          </span>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: COLORS.muted }}>
          Sunk costs (mailers, printer, stock): -$100.00 · Net after expenses: ${(totalRealized - 100).toFixed(2)}
        </div>
      </Section>

      {/* Adjustable Inputs */}
      <Section title="Adjustable Parameters" icon="⚙">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label
              style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 6 }}
            >
              Sell Price Per Pack (listing price)
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: COLORS.accent }}>$</span>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(Number(e.target.value))}
                style={{
                  background: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 6,
                  padding: "8px 12px",
                  color: COLORS.text,
                  fontSize: 16,
                  fontFamily: "'JetBrains Mono', monospace",
                  width: 100,
                }}
              />
              <input
                type="range"
                min={25}
                max={60}
                step={0.5}
                value={sellPrice}
                onChange={(e) => setSellPrice(Number(e.target.value))}
                style={{ flex: 1, accentColor: COLORS.accent }}
              />
            </div>
          </div>
          <div>
            <label
              style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 6 }}
            >
              Box Purchase Cost
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: COLORS.accent }}>$</span>
              <input
                type="number"
                value={boxCost}
                onChange={(e) => setBoxCost(Number(e.target.value))}
                style={{
                  background: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 6,
                  padding: "8px 12px",
                  color: COLORS.text,
                  fontSize: 16,
                  fontFamily: "'JetBrains Mono', monospace",
                  width: 100,
                }}
              />
              <input
                type="range"
                min={400}
                max={700}
                step={5}
                value={boxCost}
                onChange={(e) => setBoxCost(Number(e.target.value))}
              style={{ flex: 1, accentColor: COLORS.accent }}
              />
            </div>
          </div>
          <div>
            <label
              style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 6 }}
            >
              Shipping Cost Per Pack (USPS Ground Advantage)
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: COLORS.accent }}>$</span>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                step={0.1}
                style={{
                  background: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 6,
                  padding: "8px 12px",
                  color: COLORS.text,
                  fontSize: 16,
                  fontFamily: "'JetBrains Mono', monospace",
                  width: 100,
                }}
              />
              <input
                type="range"
                min={3}
                max={10}
                step={0.1}
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                style={{ flex: 1, accentColor: COLORS.accent }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Investment #1 */}
      <Section title="Investment #1 — Commander Masters Singles" icon="📦" accent>
        <div
          style={{
            background: COLORS.highlight,
            borderRadius: 8,
            padding: "14px 16px",
            marginBottom: 16,
            fontSize: 13,
            color: COLORS.muted,
            lineHeight: 1.6,
          }}
        >
          Bought 1 Commander Masters Set Booster Box for $560 → originally planned
          to sell 24 sealed packs at $43 → pivoted to breaking for singles after
          pulling high-value cards. Key pulls: Deflecting Swat (borderless + regular),
          Great Henge, Smothering Tithe, Cyclonic Rift, Mikaeus (borderless), and more.
        </div>

        <h3
          style={{
            fontSize: 12,
            color: COLORS.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "16px 0 8px",
          }}
        >
          Cost Basis & Recoup Status
        </h3>
        <Row label="Box cost" value={`$${inv1Cost.toFixed(2)}`} />
        <Row label="Realized sales so far" value={`$${inv1Realized.toFixed(2)}`} color={COLORS.green} />
        <Row label="Estimated unsold value" value={`~$${inv1UnrealizedEstimate}`} color={COLORS.accent} />
        <Row label="Total estimated value" value={`~$${inv1TotalEstimate.toFixed(0)}`} bold />
        <Row label="Recoup progress" value={`${inv1RecoupPct.toFixed(0)}%`} bold color={inv1RecoupPct >= 100 ? COLORS.green : COLORS.accent} />

        <h3
          style={{
            fontSize: 12,
            color: COLORS.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "20px 0 8px",
          }}
        >
          Full Pull List — {cmTotalCards} cards ({cmSoldCards} sold, {cmTotalCards - cmSoldCards} remaining)
        </h3>
        {cmPulls.filter(c => c.est >= 5).map((c, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", opacity: c.sold ? 0.4 : 1 }}>
            <span style={{ color: c.sold ? COLORS.green : COLORS.muted }}>
              {c.sold ? "✓ " : ""}{c.name}
            </span>
            <span style={{ color: c.sold ? COLORS.green : COLORS.text }}>
              {c.sold ? "SOLD" : `~$${c.est}`}
            </span>
          </div>
        ))}
        <div style={{ padding: "6px 0", fontSize: 12, color: COLORS.muted, borderTop: `1px solid ${COLORS.border}`, marginTop: 4 }}>
          + {cmPulls.filter(c => c.est < 5 && !c.sold).length} cards in the $1-4 range (~${cmPulls.filter(c => c.est < 5 && !c.sold).reduce((s,c) => s + c.est, 0).toFixed(0)} total)
        </div>

        <div
          style={{
            marginTop: 16,
            padding: "16px",
            background: `${COLORS.green}10`,
            border: `1px solid ${COLORS.green}30`,
            borderRadius: 8,
          }}
        >
          <Row
            label="ESTIMATED TOTAL PROFIT"
            value={`+$${(inv1TotalEstimate - inv1Cost).toFixed(0)}`}
            bold
            color={COLORS.green}
          />
          <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>
            Pivot to singles dramatically outperforms the original $43/pack sealed plan
            (which projected ~$185 profit for the full box)
          </div>
        </div>
      </Section>

      {/* ===== INVESTMENT #2: Seller's Bundle ===== */}
      <Section title="Investment #2 — Seller's Supply Bundle" icon="🎯" accent>
        <div
          style={{
            background: COLORS.highlight,
            borderRadius: 8,
            padding: "14px 16px",
            marginBottom: 16,
            fontSize: 13,
            color: COLORS.muted,
            lineHeight: 1.6,
          }}
        >
          Buy 1000ct bulk cases of toploaders, penny sleeves & team bags →
          split into 100ct "seller's bundles" → resell on eBay with free shipping.
          Each case yields 10 bundles.
        </div>

        <h3 style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "16px 0 8px" }}>
          Wholesale Sourcing (1000ct Cases)
        </h3>
        <Row label="Cardboard Gold toploaders (1000)" value={`$${toploader1000Cost.toFixed(2)}`} />
        <Row label="BCW penny sleeves (1000, bulk)" value={`$${pennySleeve1000Cost.toFixed(2)}`} />
        <Row label="BCW team bags (1000)" value={`$${teamBag1000Cost.toFixed(2)}`} />
        <Row label="Total source cost" value={`$${totalSourceCost.toFixed(2)}`} bold />

        <h3 style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "20px 0 8px" }}>
          Per-Unit Cost Breakdown
        </h3>
        <Row label="Cost per toploader" value={`$${costPerToploader.toFixed(4)}`} sub />
        <Row label="Cost per penny sleeve" value={`$${costPerSleeve.toFixed(4)}`} sub />
        <Row label="Cost per team bag" value={`$${costPerTeamBag.toFixed(4)}`} sub />
        <Row label="Cost per 100ct bundle" value={`$${costPerBundle.toFixed(2)}`} bold />

        <h3 style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "20px 0 8px" }}>
          Bundle Pricing
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 6 }}>
              Bundle Sell Price
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: COLORS.accent }}>$</span>
              <input type="number" value={bundlePrice} onChange={(e) => setBundlePrice(Number(e.target.value))} step={0.5}
                style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 12px", color: COLORS.text, fontSize: 16, fontFamily: "'JetBrains Mono', monospace", width: 100 }} />
              <input type="range" min={15} max={40} step={0.5} value={bundlePrice} onChange={(e) => setBundlePrice(Number(e.target.value))} style={{ flex: 1, accentColor: COLORS.accent }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 6 }}>
              Shipping Cost Per Bundle (USPS Ground Advantage ~2lb)
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: COLORS.accent }}>$</span>
              <input type="number" value={bundleShipping} onChange={(e) => setBundleShipping(Number(e.target.value))} step={0.1}
                style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 12px", color: COLORS.text, fontSize: 16, fontFamily: "'JetBrains Mono', monospace", width: 100 }} />
              <input type="range" min={5} max={15} step={0.1} value={bundleShipping} onChange={(e) => setBundleShipping(Number(e.target.value))} style={{ flex: 1, accentColor: COLORS.accent }} />
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "20px 0 8px" }}>
          eBay Fee Breakdown (per bundle)
        </h3>
        <Row label="Your listing price" value={`$${bundlePrice.toFixed(2)}`} />
        <Row label="Sales tax (8.2%)" value={`$${bundleTax.toFixed(2)}`} sub indent />
        <Row label="Buyer pays total" value={`$${bundleBuyerTotal.toFixed(2)}`} sub indent />
        <Row label="FVF 13.25% (on total incl. tax)" value={`-$${bundleFvf.toFixed(2)}`} color={COLORS.red} />
        <Row label="Per-order fee" value={`-$${perOrderFee.toFixed(2)}`} color={COLORS.red} />
        <Row label="Total eBay fees" value={`-$${bundleEbayFees.toFixed(2)}`} color={COLORS.red} bold />
        <Row label="Your eBay payout" value={`$${bundlePayout.toFixed(2)}`} bold color={COLORS.accent} />

        <h3 style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "20px 0 8px" }}>
          Costs & Profit (per bundle)
        </h3>
        <Row label="Product cost (bundle)" value={`-$${costPerBundle.toFixed(2)}`} color={COLORS.red} />
        <Row label="USPS Ground Advantage" value={`-$${bundleShipping.toFixed(2)}`} color={COLORS.red} />
        <Row label="Total cost per bundle" value={`-$${bundleTotalCost.toFixed(2)}`} color={COLORS.red} bold />

        <div style={{ marginTop: 20, padding: "16px", background: bundleProfitable ? `${COLORS.green}10` : `${COLORS.red}10`, border: `1px solid ${bundleProfitable ? COLORS.green : COLORS.red}30`, borderRadius: 8 }}>
          <Row label="PROFIT PER BUNDLE" value={`${bundleProfitPer >= 0 ? "+" : ""}$${bundleProfitPer.toFixed(2)}`} bold color={bundleProfitable ? COLORS.green : COLORS.red} />
          <Row label="Profit margin" value={`${bundleMargin.toFixed(1)}%`} color={bundleProfitable ? COLORS.green : COLORS.red} />
        </div>

        <div style={{ marginTop: 16, padding: "12px 16px", background: COLORS.bg, borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
          <Row label="Total profit (10 bundles)" value={`${bundleTotalProfit >= 0 ? "+" : ""}$${bundleTotalProfit.toFixed(2)}`} bold color={bundleProfitable ? COLORS.green : COLORS.red} />
          <Row label="ROI on source cost" value={`${bundleRoi >= 0 ? "+" : ""}${bundleRoi.toFixed(1)}%`} color={bundleProfitable ? COLORS.green : COLORS.red} />
        </div>
      </Section>

      {/* ===== INVESTMENT #3: Pokémon My First Battle ===== */}
      <Section title="Investment #3 — Pokémon My First Battle Singles" icon="⚡" accent>
        <div
          style={{
            background: COLORS.highlight,
            borderRadius: 8,
            padding: "14px 16px",
            marginBottom: 16,
            fontSize: 13,
            color: COLORS.muted,
            lineHeight: 1.6,
          }}
        >
          Buy 4 boxes from Amazon at $23.76/ea ($95.04 total). Received
          all 4× Charmander & Squirtle. Breaking all for singles — already
          sold a 4-card bundle for $28.35 on day 1!
        </div>

        <h3 style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "16px 0 8px" }}>
          Cost Basis
        </h3>
        <Row label="My First Battle box (Amazon)" value="$23.76" />
        <Row label="Quantity" value={`${mfbQty} boxes`} />
        <Row label="Total investment" value={`$${mfbTotalInv.toFixed(2)}`} bold />

        <h3 style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "20px 0 8px" }}>
          B&P Set — Singles ({bpCards.length} cards over $1)
        </h3>
        {bpCards.map((c, i) => (
          <div key={`bp-${i}`} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ color: COLORS.muted, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
            <span style={{ color: COLORS.text }}>${c.price.toFixed(2)}</span>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 6, paddingTop: 6 }}>
          <Row label={`List value (${bpCards.length} cards)`} value={`$${bpCards.reduce((s,c)=>s+c.price,0).toFixed(2)}`} />
          <Row label="Net after fees + shipping" value={`$${bpSinglesNet.toFixed(2)}`} color={COLORS.accent} />
          <Row label="Profit per B&P set" value={`+$${bpSinglesProfit.toFixed(2)}`} bold color={COLORS.green} />
        </div>

        <h3 style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "20px 0 8px" }}>
          C&S Set — Singles ({csCards.length} cards over $1)
        </h3>
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>
          13 cards valued over $1 · eBay Standard Envelope shipping
        </div>
        {csCards.map((c, i) => (
          <div key={`cs-${i}`} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ color: COLORS.muted, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
            <span style={{ color: COLORS.text }}>${c.price.toFixed(2)}</span>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 6, paddingTop: 6 }}>
          <Row label="Total list value (13 cards)" value={`$${csCards.reduce((s,c)=>s+c.price,0).toFixed(2)}`} />
          <Row label="Net after fees + shipping" value={`$${csSinglesNet.toFixed(2)}`} color={COLORS.accent} />
          <Row label="Box cost" value={`-$${mfbBoxCost.toFixed(2)}`} color={COLORS.red} />
          <Row label="Profit per C&S set (singles)" value={`+$${csSinglesProfit.toFixed(2)}`} bold color={COLORS.green} />
        </div>

        <h3 style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "24px 0 8px" }}>
          Scenario Outcomes (4 boxes)
        </h3>
        {mfbScenarios.map((s, i) => {
          const p = mfbScenarioProfit(s.bp, s.cs);
          const bpLabel = s.bp > 0 ? `${s.bp * bpCards.length} B&P singles` : "";
          const csLabel = s.cs > 0 ? `${s.cs * csCards.length} C&S singles` : "";
          const tag = [bpLabel, csLabel].filter(Boolean).join(" + ");
          return (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 14px", marginBottom: 8,
              background: `${COLORS.green}10`, border: `1px solid ${COLORS.green}30`, borderRadius: 8,
            }}>
              <div>
                <div style={{ fontSize: 13, color: COLORS.text, fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
                <div style={{ fontSize: 11, color: COLORS.muted }}>{tag}</div>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.green, fontFamily: "'JetBrains Mono', monospace" }}>
                +${p.toFixed(2)}
              </span>
            </div>
          );
        })}

        <div style={{
          marginTop: 12, padding: "12px 16px",
          background: COLORS.bg, borderRadius: 8, border: `1px solid ${COLORS.border}`,
        }}>
          <Row label="Expected profit (avg of 5)" value={`+$${mfbExpectedProfit.toFixed(2)}`} bold color={COLORS.green} />
          <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>
            All scenarios profitable — C&S yields more per box than B&P
          </div>
        </div>
      </Section>

      {/* ===== INVESTMENT #4: TCG Accessories ===== */}
      <Section title="Investment #4 — TCG Accessories" icon="🎨" accent>
        <div
          style={{
            background: COLORS.highlight,
            borderRadius: 8,
            padding: "14px 16px",
            marginBottom: 16,
            fontSize: 13,
            color: COLORS.muted,
            lineHeight: 1.6,
          }}
        >
          Diversify into binders, deck boxes, playmats & storage boxes.
          Low capital entry (~$100), high margins (30-60%), and natural
          cross-sell with your existing card buyer audience.
        </div>

        <h3 style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "16px 0 8px" }}>
          Starter Batch — Product Mix
        </h3>
        {accItems.map((item, i) => {
          const p = ebayPayout(item.sell);
          const profitPer = p - item.cost - item.ship;
          const marginPer = (profitPer / item.sell) * 100;
          return (
            <div key={`acc-${i}`} style={{
              padding: "10px 14px", marginBottom: 8, borderRadius: 8,
              background: COLORS.bg, border: `1px solid ${COLORS.border}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
                <span style={{ color: COLORS.text }}>{item.name}</span>
                <span style={{ color: COLORS.accent }}>×{item.qty}</span>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: COLORS.muted }}>
                <span>Cost: ${item.cost}</span>
                <span>Sell: ${item.sell}</span>
                <span>Ship: ${item.ship.toFixed(2)}</span>
                <span style={{ color: COLORS.green }}>+${profitPer.toFixed(2)}/ea ({marginPer.toFixed(0)}%)</span>
              </div>
            </div>
          );
        })}

        <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 8, paddingTop: 8 }}>
          <Row label="Total units" value={`${accTotalUnits}`} />
          <Row label="Total investment" value={`$${accInvestment.toFixed(2)}`} bold />
          <Row label={`Expected profit (${Math.round(sellRateAcc * 100)}% sell-through)`} value={`+$${accTotalProfit.toFixed(2)}`} bold color={COLORS.green} />
          <Row label="ROI" value={`+${accRoi.toFixed(1)}%`} color={COLORS.green} />
        </div>

        <div style={{
          marginTop: 16, padding: "12px 16px",
          background: COLORS.bg, borderRadius: 8, border: `1px solid ${COLORS.border}`,
          fontSize: 13, color: COLORS.muted, lineHeight: 1.7,
        }}>
          <div style={{ fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>Why accessories?</div>
          <div>→ Cross-sell to your existing MFB & MTG single buyers</div>
          <div>→ Playmats offer 60%+ margins at low buy-in</div>
          <div>→ Builds on your existing seller's bundle supply chain</div>
          <div>→ Low risk: $100 starter batch, easy to scale winners</div>
        </div>
      </Section>

      {/* Grand Totals */}
      <Section title="Grand Totals — All Investments" icon="📊">
        <Row label="Inv. #1 profit (booster box)" value={`${totalProfit >= 0 ? "+" : ""}$${totalProfit.toFixed(2)}`} color={isProfitable ? COLORS.green : COLORS.red} />
        <Row label="Inv. #2 profit (10 bundles)" value={`${bundleTotalProfit >= 0 ? "+" : ""}$${bundleTotalProfit.toFixed(2)}`} color={bundleProfitable ? COLORS.green : COLORS.red} />
        <Row label="Inv. #3 expected (My First Battle)" value={`+$${mfbExpectedProfit.toFixed(2)}`} color={COLORS.green} />
        <Row label="Inv. #4 expected (accessories)" value={`+$${accTotalProfit.toFixed(2)}`} color={accProfitable ? COLORS.green : COLORS.red} />
        <div style={{ height: 8 }} />
        <Row label="EXPECTED COMBINED PROFIT" value={`+$${grandProfitExpected.toFixed(2)}`} bold color={COLORS.green} />
        <div style={{ height: 4 }} />
        <Row label="Best case (4× C&S)" value={`+$${grandProfitBest.toFixed(2)}`} sub color={COLORS.muted} />
        <Row label="Worst case (4× B&P)" value={`+$${grandProfitWorst.toFixed(2)}`} sub color={COLORS.muted} />
      </Section>

      {/* Capital Needed */}
      <Section title="Capital Required" icon="💰">
        <div style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Investment #1</div>
        <Row label="Booster box" value={`$${boxCost.toFixed(2)}`} />
        <Row label="Shipping (24 packs)" value={`$${(shippingCost * packsPerBox).toFixed(2)}`} />
        <div style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.06em", textTransform: "uppercase", margin: "12px 0 8px" }}>Investment #2</div>
        <Row label="Toploaders (1000ct)" value={`$${toploader1000Cost.toFixed(2)}`} />
        <Row label="Penny sleeves (1000ct)" value={`$${pennySleeve1000Cost.toFixed(2)}`} />
        <Row label="Team bags (1000ct)" value={`$${teamBag1000Cost.toFixed(2)}`} />
        <Row label="Shipping (10 bundles)" value={`$${(bundleShipping * bundlesPerCase).toFixed(2)}`} />
        <div style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.06em", textTransform: "uppercase", margin: "12px 0 8px" }}>Investment #3</div>
        <Row label="My First Battle (4 boxes)" value={`$${mfbTotalInv.toFixed(2)}`} />
        <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>
          Shipping costs come out of revenue, not upfront capital
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.06em", textTransform: "uppercase", margin: "12px 0 8px" }}>Investment #4</div>
        <Row label="TCG accessories starter batch" value={`$${accInvestment.toFixed(2)}`} />
        <div style={{ height: 8 }} />
        <Row
          label="TOTAL TO RAISE"
          value={`$${grandCapital.toFixed(2)}`}
          bold
          color={COLORS.accent}
        />
      </Section>

      {/* Key Assumptions */}
      <Section title="Key Assumptions & Notes" icon="📋">
        <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.8 }}>
          <div style={{ marginBottom: 6 }}>
            → eBay FVF for trading cards (Starter Store): <strong style={{ color: COLORS.text }}>13.25%</strong> on
            total incl. sales tax + <strong style={{ color: COLORS.text }}>$0.40</strong>/order (or $0.30 for ≤$10)
          </div>
          <div style={{ marginBottom: 6 }}>
            → Colorado Springs combined sales tax: <strong style={{ color: COLORS.text }}>8.2%</strong> (state
            2.9% + county 1.23% + city 3.07% + special 1%)
          </div>
          <div style={{ marginBottom: 6 }}>
            → eBay collects & remits sales tax — but charges FVF on the
            tax-inclusive total
          </div>
          <div style={{ marginBottom: 6 }}>
            → USPS Ground Advantage retail ~$5.30 for ≤1 lb · eBay Standard
            Envelope ~$1.27 (or $0.68 for cards ≤$5) for singles
          </div>
          <div style={{ marginBottom: 6 }}>
            → Free shipping offered to buyers (cost absorbed by seller)
          </div>
          <div style={{ marginBottom: 6 }}>
            → eBay Starter Store subscription (same FVF as no store — upgrade
            to Basic for 12.35% rate)
          </div>
          <div style={{ marginBottom: 6 }}>
            → Packaging supplies already on hand (not included in capital)
          </div>
          <div style={{ marginBottom: 6 }}>
            → My First Battle: break ALL sets for singles regardless of
            variant. B&P = 6 cards over $1, C&S = 13 cards over $1.
          </div>
          <div>
            → C&S singles prices from TCGPlayer NM market value (Blue
            Border Squirtle adjusted to ~$15 realistic)
          </div>
          <div style={{ marginBottom: 6 }}>
            → TCG accessories: 80% sell-through assumed. Shipped via
            USPS Ground Advantage ($5.30-$6.50 depending on weight).
          </div>
          <div>
            → Accessory prices based on Amazon/distributor sourcing
            and current eBay market values
          </div>
        </div>
      </Section>

      {/* Action Items */}
      <Section title="Action Steps" icon="✅">
        <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.9 }}>
          {[
            "Source Commander Masters Box ✓ → PIVOTED TO SINGLES (key pulls listed)",
            "Order 4× My First Battle ✓ → RECEIVED 4× C&S → BREAKING FOR SINGLES",
            "List remaining CM singles (Deflecting Swat BL ~$88, Great Henge ~$42, etc.)",
            "List remaining MFB C&S singles across 4 sets",
            "Source 1000ct supply cases for seller's bundles",
            "Source TCG accessories starter batch: binders, deck boxes, playmats",
            "Ship singles via eBay Standard Envelope · bundles via USPS Ground Advantage",
            "Track actual sales in realized log — update recoup progress",
            "Reinvest MFB singles profits into 80/20 MFB/FE split for growth",
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 2 }}>
              <span style={{ color: COLORS.accent, fontWeight: 600 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          fontSize: 11,
          color: COLORS.muted,
          marginTop: 24,
          paddingBottom: 40,
          letterSpacing: "0.05em",
        }}
      >
        Last updated: April 22, 2026 · Plan is a living document — add investments as we go
      </div>
    </div>
  );
}
