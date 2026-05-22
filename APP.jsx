import { useMemo, useState } from 'react';

const CATEGORIES = [
  {
    name: '農業機械',
    sub: 'ラジコン草刈機・草刈機・耕運機・発電機',
    image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/product9.jpg',
    children: ['ラジコン草刈機', '草刈機', '耕運機', '発電機'],
  },
  {
    name: '工具・DIY',
    sub: '高圧洗浄機・電動工具',
    image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/kouatsu01.jpg',
    children: ['高圧洗浄機', '電動工具', '溶接用品', 'LED作業灯'],
  },
  {
    name: '部品・消耗品',
    sub: '交換部品・メンテナンス',
    image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/product32.jpg',
    children: ['交換刃', 'エアクリーナー', 'ベルト', 'メンテナンス用品'],
  },
  {
    name: '日用品・生活雑貨',
    sub: '収納・便利グッズ・家庭用品',
    image: 'https://www.komatsusyouji.com/wp-content/uploads/2025/06/1211.jpg',
    children: ['収納用品', 'キッチン用品', '便利グッズ', '家庭雑貨'],
  },
  {
    name: 'アウトドア・作業用品',
    sub: 'キャンプ・現場用品',
    image: 'https://www.komatsusyouji.com/wp-content/uploads/2025/06/1-1.jpg',
    children: ['テント', 'チェア', 'ワゴン', '収納バッグ'],
  },
  {
    name: 'スマホ・PC周辺機器',
    sub: 'スタンド・アクセサリー',
    image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/product32.jpg',
    children: ['スマホスタンド', 'タブレット用品', '充電関連'],
  },
  {
    name: '法人向け',
    sub: '業務用・まとめ買い',
    image: 'https://www.komatsusyouji.com/wp-content/uploads/2025/08/011.jpg',
    children: ['業務導入', 'OEM相談', '継続仕入れ'],
  },
];

const PRODUCT_TYPE_TEMPLATES = {
  agriculture: {
    catch: '農業・法面・現場作業向けモデル',
    features: ['農地・現場作業向け', '日本国内発送対応', '法人見積相談可能', '部品・消耗品相談対応'],
    shipping: '大型商品は営業所止め、または法人配送となる場合があります。',
  },
  tools: {
    catch: '工具・作業用品モデル',
    features: ['DIY・現場作業向け', '日本国内発送対応', '法人相談可能', 'メンテナンス相談対応'],
    shipping: '通常配送対応商品です。',
  },
  outdoor: {
    catch: 'アウトドア・レジャー向けモデル',
    features: ['アウトドア・防災向け', '軽量・持ち運び対応', '日本国内発送対応', '収納便利'],
    shipping: '宅配便配送対応商品です。',
  },
  lifestyle: {
    catch: '生活・収納向けモデル',
    features: ['生活空間向け', '収納・整理向け', '組立簡単', '日本国内発送対応'],
    shipping: '通常配送対応商品です。',
  },
  digital: {
    catch: 'デジタル周辺機器',
    features: ['スマホ・タブレット対応', '軽量設計', '持ち運び便利', '日本国内発送対応'],
    shipping: 'ネコポス・宅配便対応商品です。',
  },
  parts: {
    catch: '交換・保守向け部品',
    features: ['交換・保守用部品', 'メンテナンス対応', '部品相談可能', '日本国内発送対応'],
    shipping: '在庫状況により納期が変動する場合があります。',
  },
};

const PRODUCT_DETAILS = {
  'ラジコン草刈機KM550i 排土板付き 9馬力 ブラシレス': {
    catch: '法面・農地管理向け人気モデル',
    features: ['9馬力ブラシレスモーター搭載', 'リモコン操作対応', '法面・太陽光発電所向け', '排土板付きモデル'],
    specs: [['エンジン', '9馬力'], ['操作方式', 'ラジコン操作'], ['用途', '法面・農地管理'], ['発送', '日本国内発送対応']],
    shipping: '大型商品のため営業所止め、または法人配送対応となる場合があります。',
  },
  '一年保証付 ラジコン草刈機 KM860 16馬力': {
    catch: '高出力16馬力モデル',
    features: ['16馬力高出力エンジン', 'クローラー走行', '刈幅800mm', '技適認証済'],
    specs: [['エンジン', '16馬力'], ['刈幅', '800mm'], ['走行方式', 'クローラー'], ['保証', '一年保証付き']],
    shipping: '大型農機具のため配送条件をご確認ください。',
  },
  'ミニ耕運機 52cc 2ストロークエンジン': {
    catch: '家庭菜園・小規模農地向け小型耕運機',
    features: ['52cc 2ストロークエンジン搭載', '軽量コンパクト設計', '家庭菜園・畑作業向け', '初心者でも扱いやすいモデル'],
    specs: [['エンジン', '52cc 2ストローク'], ['用途', '家庭菜園・小規模農地'], ['始動方式', 'リコイルスターター'], ['燃料', '混合燃料'], ['特徴', '軽量・コンパクト'], ['発送', '日本国内発送対応']],
    shipping: '通常宅配便対応商品です。地域により配送条件が異なる場合があります。',
  },
};

// 商品データ
// ホームページは維持しつつ、商品詳細・商品体験を強化

const PRODUCTS = [
  { type: 'agriculture', title: 'ラジコン草刈機KM550i 排土板付き 9馬力 ブラシレス', price: '¥486,200', category: '農機具', desc: '法面・農地・太陽光発電所向け。9馬力ブラシレスモーター搭載。リモコン操作対応・予約受付中。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2025/06/25984.jpg' },
  { type: 'agriculture', title: '一年保証付 ラジコン草刈機 KM860 16馬力', price: '¥728,100', category: '農機具', desc: '16馬力・刈幅800mm・クローラー走行。技適認証済・法面作業対応モデル。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/product9.jpg' },
  { type: 'agriculture', title: 'ハンマーナイフモア SG0814L 刈幅860mm', price: '¥434,970', category: '農機具', desc: '15馬力エンジン搭載。荒地・長草作業向けクローラー式ハンマーナイフモア。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2025/08/011.jpg' },
  { type: 'agriculture', title: '動噴 50L タンクキャリー 20mホース', price: '¥38,700', category: '農機具', desc: '50L大容量タンク・20mホース付き。農作業・除草剤散布・消毒作業向け。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/tank01.jpg' },
  { type: 'agriculture', title: 'ミニ耕運機 52cc 2ストロークエンジン', price: '¥25,452', category: '農機具', desc: '52ccエンジン搭載。家庭菜園・小規模農地向け小型耕運機。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/mini_koun01.jpg' },
  { type: 'tools', title: '高圧洗浄機 エンジン式 6.5HP 19Mpa', price: '¥35,838', category: '工具・DIY用品', desc: '6.5HPエンジン式。現場・農機具洗浄・外壁清掃向け高圧洗浄機。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/kouatsu01.jpg' },
  { type: 'outdoor', title: 'テント エアテント UV加工 インフレータブル', price: '¥50,480', category: 'アウトドア用品', desc: 'インフレータブル構造採用。アウトドア・キャンプ・防災用途向け。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2025/06/1-1.jpg' },
  { type: 'outdoor', title: 'キャリー ワゴン 太タイヤ 100リットル', price: '¥6,714', category: 'アウトドア用品', desc: '太タイヤ仕様・100L大容量。アウトドア・イベント・買い物向け。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/11/product45.jpg' },
  { type: 'outdoor', title: 'アウトドアチェア 軽量 折り畳み式', price: '¥2,232', category: 'アウトドア用品', desc: '軽量折り畳みタイプ。キャンプ・BBQ・釣り・アウトドア向け。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/11/product49.jpg' },
  { type: 'lifestyle', title: 'シューズラック 6段 折り畳み式 扉付き', price: '¥8,680', category: 'インテリア・家具', desc: '折り畳み式・扉付き収納。玄関・倉庫・室内整理向け。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2025/06/1211.jpg' },
  { type: 'lifestyle', title: 'テレビ台 スライド式 幅130〜179cm', price: '¥7,272', category: 'インテリア・家具', desc: '幅調整対応・収納付き。リビング・寝室向けテレビボード。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/11/product43.jpg' },
  { type: 'digital', title: 'スマホスタンド ゴールド 折り畳み式', price: '¥1,008', category: 'スマホ・PC用品', desc: '角度調整対応。iPhone・iPad・Switch向け折り畳みスタンド。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/product32.jpg' },
  { type: 'parts', title: 'LONCIN 16馬力エンジン用エアクリーナー', price: '¥1,200', category: '部品・消耗品', desc: 'LONCIN16馬力エンジン対応。LM750・KM860・UR800用交換部品。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/product32.jpg' },
  { type: 'parts', title: '草刈機交換刃セット', price: '¥3,980', category: '部品・消耗品', desc: '草刈機用交換ブレード。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/product32.jpg' },
  { type: 'tools', title: 'LED作業ライト', price: '¥2,980', category: '工具・DIY用品', desc: '夜間作業・防災用LEDライト。', image: 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/kouatsu01.jpg' },
];

const NOTICES = ['KM550i 入荷待ち予約を受付中です。', '法人様向けまとめ買い・見積相談に対応しています。', '農機具部品・消耗品の手配もご相談ください。'];

function parsePrice(price) {
  return Number(String(price).replace(/[^0-9]/g, '')) || 0;
}

function formatYen(value) {
  return `¥${value.toLocaleString('ja-JP')}`;
}

function scrollToTop() {
  if (typeof window !== 'undefined') window.scrollTo(0, 0);
}

function categoryMatches(categoryName, product) {
  const text = `${product.title} ${product.category} ${product.desc}`;
  const rules = {
    '農業機械': ['農機具', '草刈', '耕運', '動噴', '発電機', '噴霧'],
    '工具・DIY': ['工具', 'DIY', '高圧洗浄', '溶接', 'LED', '電動'],
    '部品・消耗品': ['部品', '消耗品', 'エアクリーナー', '交換刃', 'ベルト'],
    '日用品・生活雑貨': ['インテリア', '家具', '収納', 'ラック', 'テレビ台', '生活'],
    'アウトドア・作業用品': ['アウトドア', 'キャンプ', 'テント', 'チェア', 'ワゴン', 'バッグ'],
    'スマホ・PC周辺機器': ['スマホ', 'PC', 'タブレット', 'スタンド'],
    '法人向け': ['農機具', '工具', '部品', '法人', '業務'],
  };
  return (rules[categoryName] || [categoryName]).some((keyword) => text.includes(keyword));
}

function filterByPrice(products, range) {
  if (range === 'all') return products;
  return products.filter((product) => {
    const price = parsePrice(product.price);
    if (range === 'under5000') return price < 5000;
    if (range === '5000to30000') return price >= 5000 && price <= 30000;
    if (range === 'over30000') return price > 30000;
    return true;
  });
}

function sortProducts(products, mode) {
  const copied = [...products];
  if (mode === 'priceLow') return copied.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  if (mode === 'priceHigh') return copied.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  if (mode === 'name') return copied.sort((a, b) => a.title.localeCompare(b.title, 'ja'));
  return copied;
}

function getProductDetails(product) {
  const template = PRODUCT_TYPE_TEMPLATES[product.type] || PRODUCT_TYPE_TEMPLATES.tools;
  return PRODUCT_DETAILS[product.title] || {
    catch: template.catch,
    features: template.features,
    specs: [['商品名', product.title], ['カテゴリ', product.category], ['発送', '日本国内発送対応'], ['問い合わせ', 'LINE・メール対応'], ['法人対応', '見積・まとめ買い相談可']],
    shipping: template.shipping,
  };
}

function getCategoryImage(category) {
  const imageMap = {
    '農業機械': 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/product9.jpg',
    '工具・DIY': 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/kouatsu01.jpg',
    '部品・消耗品': 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/product32.jpg',
    '日用品・生活雑貨': 'https://www.komatsusyouji.com/wp-content/uploads/2025/06/1211.jpg',
    'アウトドア・作業用品': 'https://www.komatsusyouji.com/wp-content/uploads/2025/06/1-1.jpg',
    'スマホ・PC周辺機器': 'https://www.komatsusyouji.com/wp-content/uploads/2024/12/product32.jpg',
    '法人向け': 'https://www.komatsusyouji.com/wp-content/uploads/2025/08/011.jpg',
  };
  return imageMap[category.name] || category.image;
}

export default function KomatsuShojiMockup() {
  const [page, setPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [authMode, setAuthMode] = useState('login');
  const [sortMode, setSortMode] = useState('recommend');
  const [priceRange, setPriceRange] = useState('all');

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    if (page === 'category' && selectedCategory) result = result.filter((product) => categoryMatches(selectedCategory.name, product));
    if (page === 'search') {
      const term = searchTerm.trim();
      result = result.filter((product) => !term || product.title.includes(term) || product.category.includes(term) || product.desc.includes(term));
    }
    return sortProducts(filterByPrice(result, priceRange), sortMode);
  }, [page, selectedCategory, searchTerm, priceRange, sortMode]);

  const total = cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);

  const goHome = () => {
    setPage('home');
    setSelectedCategory(null);
    setSelectedProduct(null);
    scrollToTop();
  };

  const openCategory = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setPage('category');
    setPriceRange('all');
    setSortMode('recommend');
    scrollToTop();
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setPage('product');
    scrollToTop();
  };

  const openSearch = () => {
    setSelectedCategory(null);
    setSelectedProduct(null);
    setPage('search');
    setPriceRange('all');
    setSortMode('recommend');
    scrollToTop();
  };

  const addToCart = (product) => {
    setCartItems((items) => {
      const found = items.find((item) => item.title === product.title);
      if (found) return items.map((item) => (item.title === product.title ? { ...item, qty: item.qty + 1 } : item));
      return [...items, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (title, delta) => setCartItems((items) => items.map((item) => (item.title === title ? { ...item, qty: Math.max(1, item.qty + delta) } : item)));
  const removeFromCart = (title) => setCartItems((items) => items.filter((item) => item.title !== title));
  const toggleWish = (product) => setWishlist((items) => (items.includes(product.title) ? items.filter((title) => title !== product.title) : [...items, product.title]));

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-zinc-900" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif" }}>
      <Header categories={CATEGORIES} cartCount={cartItems.length} goHome={goHome} openCategory={openCategory} openSearch={openSearch} searchTerm={searchTerm} setAuthMode={setAuthMode} setCartOpen={setCartOpen} setLoginOpen={setLoginOpen} setQuoteOpen={setQuoteOpen} setSearchTerm={setSearchTerm} wishCount={wishlist.length} />

      {loginOpen && <SideModal title={authMode === 'login' ? '会員ログイン' : '新規会員登録'} onClose={() => setLoginOpen(false)}><LoginForm mode={authMode} setMode={setAuthMode} /></SideModal>}
      {quoteOpen && <SideModal title="見積・法人相談" onClose={() => setQuoteOpen(false)}><QuoteForm /></SideModal>}
      {cartOpen && <SideModal title="カート" onClose={() => setCartOpen(false)}><CartPanel items={cartItems} total={total} updateQty={updateQty} removeFromCart={removeFromCart} setQuoteOpen={setQuoteOpen} /></SideModal>}

      <main className="mx-auto max-w-[1440px] px-5 py-6">
        {page === 'home' && <HomePage categories={CATEGORIES} notices={NOTICES} products={PRODUCTS} openCategory={openCategory} openProduct={openProduct} openSearch={openSearch} setQuoteOpen={setQuoteOpen} addToCart={addToCart} toggleWish={toggleWish} wishlist={wishlist} />}
        {page === 'category' && selectedCategory && <ListingPage title={selectedCategory.name} subtitle={selectedCategory.sub} products={filteredProducts} goHome={goHome} openProduct={openProduct} addToCart={addToCart} toggleWish={toggleWish} wishlist={wishlist} priceRange={priceRange} setPriceRange={setPriceRange} sortMode={sortMode} setSortMode={setSortMode} />}
        {page === 'search' && <ListingPage title="検索結果" subtitle={`「${searchTerm || '全商品'}」に関連する商品`} products={filteredProducts} goHome={goHome} openProduct={openProduct} addToCart={addToCart} toggleWish={toggleWish} wishlist={wishlist} priceRange={priceRange} setPriceRange={setPriceRange} sortMode={sortMode} setSortMode={setSortMode} />}
        {page === 'product' && selectedProduct && <ProductPage product={selectedProduct} products={PRODUCTS} goHome={goHome} openProduct={openProduct} addToCart={addToCart} setQuoteOpen={setQuoteOpen} toggleWish={toggleWish} wishlist={wishlist} />}
      </main>
      <Footer />
    </div>
  );
}

function Header({ categories, cartCount, goHome, openCategory, openSearch, searchTerm, setAuthMode, setCartOpen, setLoginOpen, setQuoteOpen, setSearchTerm, wishCount }) {
  return (
    <>
      <div className="bg-slate-800 text-white text-xs md:text-sm">
        <div className="mx-auto flex max-w-[1440px] justify-between px-5 py-2">
          <p>厳選商品・日本国内発送・法人対応EC</p>
          <p className="hidden md:block">LINE相談・メール対応 / 部品・アフターサポート</p>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-5 py-4 lg:grid-cols-[280px_1fr_330px] lg:items-center">
          <div>
            <h1 onClick={goHome} className="cursor-pointer text-2xl font-black">小松商事株式会社</h1>
            <p className="text-xs text-zinc-500">厳選商品セレクトEC / KOMATSU SHOJI</p>
          </div>
          <div className="grid grid-cols-[1fr_82px] overflow-hidden rounded-xl border border-zinc-300 bg-zinc-100 lg:grid-cols-[150px_1fr_90px]">
            <select className="hidden border-r border-zinc-300 bg-white px-3 text-sm outline-none lg:block"><option>全カテゴリ</option><option>農業機械</option><option>工具・DIY</option><option>日用品</option></select>
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="bg-transparent px-4 py-3 text-sm outline-none" placeholder="商品名・型番・カテゴリで検索" />
            <button onClick={openSearch} className="bg-sky-700 font-black text-white">検索</button>
          </div>
          <div className="hidden justify-end gap-2 text-sm lg:flex">
            <button onClick={() => { setAuthMode('login'); setLoginOpen(true); }} className="rounded-xl border border-sky-700 bg-white px-4 py-3 font-bold text-sky-700 hover:bg-sky-50">ログイン</button>
            <button onClick={() => { setAuthMode('register'); setLoginOpen(true); }} className="rounded-xl bg-sky-700 px-4 py-3 font-bold text-white hover:bg-slate-800">会員登録</button>
            <button className="rounded-xl border px-3 py-3 font-bold hover:bg-zinc-50">お気に入り（{wishCount}）</button>
            <button onClick={() => setCartOpen(true)} className="rounded-xl border px-3 py-3 font-bold hover:bg-zinc-50">カート（{cartCount}）</button>
            <button onClick={() => setQuoteOpen(true)} className="rounded-xl bg-amber-500 px-3 py-3 font-bold text-white hover:bg-amber-600">見積相談</button>
          </div>
          <button onClick={() => setCartOpen(true)} className="rounded-xl bg-amber-500 px-4 py-3 font-black text-white lg:hidden">カート（{cartCount}）</button>
        </div>
        <nav className="overflow-x-auto bg-zinc-900 text-white">
          <div className="mx-auto flex max-w-[1440px] whitespace-nowrap px-5 text-sm font-black">
            <button onClick={goHome} className="bg-sky-700 px-6 py-4">ホーム</button>
            {categories.slice(0, 6).map((category) => <button key={category.name} onClick={() => openCategory(category)} className="px-5 py-4 hover:bg-zinc-800">{category.name}</button>)}
            <button onClick={() => setQuoteOpen(true)} className="px-5 py-4 hover:bg-zinc-800">法人向け</button>
          </div>
        </nav>
      </header>
    </>
  );
}

function HomePage({ categories, notices, products, openCategory, openProduct, openSearch, setQuoteOpen, addToCart, toggleWish, wishlist }) {
  const pickupProducts = [products.find((p) => p.title.includes('テント')), products.find((p) => p.title.includes('高圧洗浄機')), products.find((p) => p.title.includes('テレビ台')), products.find((p) => p.title.includes('ラジコン草刈機'))].filter(Boolean);
  const toolsAndParts = products.filter((product) => categoryMatches('工具・DIY', product) || categoryMatches('部品・消耗品', product)).slice(0, 4);

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[260px_1fr_300px]">
        <aside className="hidden overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm lg:block">
          <div className="bg-sky-700 px-5 py-4 font-black text-white">商品を探す</div>
          {categories.map((category) => <button key={category.name} onClick={() => openCategory(category)} className="flex w-full justify-between border-b px-5 py-4 text-left hover:bg-sky-50"><span><b className="text-sm">{category.name}</b><br /><span className="text-xs text-zinc-500">{category.sub}</span></span><span className="text-zinc-400">›</span></button>)}
        </aside>
        <section className="relative min-h-[460px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <img src="https://www.komatsusyouji.com/wp-content/uploads/2025/06/1-1.jpg" className="absolute inset-0 h-full w-full object-cover" alt="メインビジュアル" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
          <div className="relative z-10 flex h-full max-w-2xl flex-col justify-center p-8 text-white md:p-12">
            <p className="mb-5 w-fit rounded bg-sky-700 px-4 py-2 text-sm font-black">KOMATSU SHOJI SELECT</p>
            <h2 className="mb-5 whitespace-pre-line text-3xl font-black leading-tight md:text-5xl">暮らしと仕事を支える{`\n`}セレクトECストア</h2>
            <p className="mb-7 text-base leading-relaxed text-zinc-100 md:text-lg">農業機械・工具・日用品・アウトドア用品まで、幅広い商品を日本国内より発送。法人対応・部品相談にも対応しています。</p>
            <div className="flex flex-wrap gap-2.5"><button onClick={() => openCategory(categories[0])} className="rounded-lg bg-amber-500 px-6 py-3 text-sm font-black hover:bg-amber-600">今すぐ見る</button><button onClick={openSearch} className="rounded-lg bg-white px-6 py-3 text-sm font-black text-zinc-900 hover:bg-zinc-100">商品一覧</button><button onClick={() => setQuoteOpen(true)} className="rounded-lg border border-white/60 px-6 py-3 text-sm font-black hover:bg-white/10">法人相談</button></div>
          </div>
        </section>
        <aside className="hidden flex-col gap-4 lg:flex"><InfoCard title="はじめての方へ" text="用途・予算・現場条件から商品選びをサポートします。" button="無料相談する" onClick={() => setQuoteOpen(true)} /><div className="rounded-md bg-slate-800 p-5 text-white shadow-sm"><p className="mb-1 text-sm text-sky-100">法人・業者様</p><h3 className="mb-3 text-lg font-black">まとめ買い・OEM相談</h3><p className="text-sm leading-relaxed text-slate-100">継続仕入れ、業務用相談、部品供給にも対応。</p></div><div className="flex-1 rounded-xl border bg-white p-5 shadow-sm"><h3 className="mb-3 text-lg font-black">お知らせ</h3>{notices.map((notice) => <p key={notice} className="border-b py-2 text-sm text-zinc-600">{notice}</p>)}</div></aside>
      </section>

      <TrustRow />
      <SectionTitle sub="CATEGORY" title="カテゴリから探す" />
      <p className="mb-5 text-sm leading-relaxed text-zinc-500">用途・作業内容・商品ジャンルから、必要な商品をすぐに探せます。</p>
      <CategoryGrid categories={categories} openCategory={openCategory} />
      <SubCategoryPanel categories={categories} openCategory={openCategory} />
      <NewsList notices={notices} />
      <SectionTitle sub="PICK UP" title="人気商品ピックアップ" action="すべて見る" onAction={openSearch} />
      <ProductGrid products={pickupProducts} openProduct={openProduct} addToCart={addToCart} toggleWish={toggleWish} wishlist={wishlist} />
      <SectionTitle sub="LIFESTYLE & WORK" title="工具・部品ピックアップ" action="すべて見る" onAction={openSearch} />
      <ProductGrid products={toolsAndParts} openProduct={openProduct} addToCart={addToCart} toggleWish={toggleWish} wishlist={wishlist} />
      <PromoFeature openSearch={openSearch} />
      <RankingSimple products={products} openProduct={openProduct} />
      <SectionTitle sub="SERVICE" title="サービス・サポート" />
      <ServiceBanners />
      <GuideBlocks />
    </>
  );
}

function PromoFeature({ openSearch }) {
  return <section className="mb-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"><div className="grid lg:grid-cols-[1.2fr_1fr]"><img src="https://www.komatsusyouji.com/wp-content/uploads/2025/06/1-1.jpg" className="h-full min-h-[260px] w-full object-cover" alt="特集" /><div className="flex flex-col justify-center p-8"><p className="mb-2 text-sm font-black text-sky-700">SPECIAL</p><h3 className="mb-4 text-3xl font-black">暮らし・仕事 特集</h3><p className="mb-6 leading-relaxed text-zinc-600">アウトドア用品・工具・生活用品・農業機械まで幅広く掲載。法人相談にも対応しています。</p><button onClick={openSearch} className="w-fit rounded-xl bg-sky-700 px-6 py-3 font-black text-white hover:bg-slate-800">特集を見る</button></div></div></section>;
}

function ListingPage({ title, subtitle, products, goHome, openProduct, addToCart, toggleWish, wishlist, priceRange, setPriceRange, sortMode, setSortMode }) {
  return <><button onClick={goHome} className="mb-4 text-sm font-black text-sky-700">← ホームに戻る</button><div className="mb-6 rounded-md bg-gradient-to-r from-slate-800 to-sky-700 p-7 text-white"><p className="mb-2 text-sm font-black text-sky-100">PRODUCT LIST</p><h2 className="mb-3 text-4xl font-black">{title}</h2><p>{subtitle}</p></div><div className="mb-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><p className="font-black">{products.length}件の商品</p><p className="mt-1 text-sm text-zinc-500">価格帯・並び順で商品を絞り込めます。</p></div><div className="flex flex-col gap-3 sm:flex-row"><select value={priceRange} onChange={(event) => setPriceRange(event.target.value)} className="rounded-xl border bg-white px-4 py-2 text-sm font-bold"><option value="all">すべての価格</option><option value="under5000">5,000円未満</option><option value="5000to30000">5,000〜30,000円</option><option value="over30000">30,000円以上</option></select><select value={sortMode} onChange={(event) => setSortMode(event.target.value)} className="rounded-xl border bg-white px-4 py-2 text-sm font-bold"><option value="recommend">おすすめ順</option><option value="priceLow">価格が安い順</option><option value="priceHigh">価格が高い順</option><option value="name">商品名順</option></select><button onClick={() => { setPriceRange('all'); setSortMode('recommend'); }} className="rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-black hover:bg-zinc-100">条件クリア</button></div></div></div><ProductGrid products={products} openProduct={openProduct} addToCart={addToCart} toggleWish={toggleWish} wishlist={wishlist} /></>;
}

function ProductGallery({ product }) {
  const images = product.gallery || [product.image];
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <img
          src={activeImage}
          alt={product.title}
          className="h-[360px] w-full object-contain bg-white p-4 md:h-[520px]"
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((img) => (
          <button
            key={img}
            onClick={() => setActiveImage(img)}
            className={`overflow-hidden rounded-xl border bg-white ${activeImage === img ? 'border-sky-700 ring-2 ring-sky-100' : 'border-zinc-200'}`}
          >
            <img
              src={img}
              alt="thumbnail"
              className="h-20 w-full object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductPage({ product, products, goHome, openProduct, addToCart, setQuoteOpen, toggleWish, wishlist }) {
  const details = getProductDetails(product);
  return <><button onClick={goHome} className="mb-4 text-sm font-black text-sky-700">← ホームに戻る</button><section className="grid gap-8 rounded-xl border bg-white p-5 shadow-sm md:p-7 lg:grid-cols-2"><ProductGallery product={product} /><div><p className="mb-2 font-black text-amber-500">{product.category}</p><p className="mb-2 inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-black tracking-wide text-sky-700">{details.catch}</p><h2 className="mb-4 text-3xl font-black leading-tight lg:text-4xl">{product.title}</h2><p className="mb-6 leading-relaxed text-zinc-600">{product.desc}</p><div className="mb-6 grid gap-3">{details.features.map((feature) => <div key={feature} className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-700 text-sm font-black text-white">✓</div><p className="font-bold text-zinc-700">{feature}</p></div>)}</div><div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-600">
              人気商品
            </span>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-700">
              国内発送
            </span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-600">
              法人対応
            </span>
          </div>

          <div className="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm"><div className="mb-3 flex flex-wrap gap-2"><span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-700">在庫確認可</span><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-600">法人見積対応</span></div><p className="mb-1 text-sm text-zinc-500">販売価格</p><p className="text-4xl font-black text-sky-700">{product.price}</p><p className="mt-2 text-xs text-zinc-500">税込 / 送料条件は商品により異なります</p></div><div className="mb-6 grid grid-cols-2 gap-3"><button onClick={() => addToCart(product)} className="rounded-xl bg-amber-500 py-4 font-black text-white">カートに入れる</button><button onClick={() => setQuoteOpen(true)} className="rounded-xl bg-sky-700 py-4 font-black text-white">見積相談</button></div><p className="border-t pt-5 text-sm leading-7 text-zinc-700">✓ 日本国内発送対応<br />✓ LINE・メール相談対応<br />✓ 法人様のまとめ買い相談可能<br />✓ 部品・消耗品の手配相談可能</p></div></section><LongProductDetail product={product} details={details} /><ProductFaq />
      <RelatedProducts product={product} products={products} openProduct={openProduct} addToCart={addToCart} toggleWish={toggleWish} wishlist={wishlist} /></>;
}

function getTypeContent(product) {
  const map = {
    agriculture: {
      title: '現場で使えるプロ仕様モデル',
      text1: '法面・農地・太陽光発電所など、実際の現場環境を想定した人気モデルです。',
      text2: '導入相談・部品供給・継続利用まで含めたサポートに対応しています。',
      support: '部品・修理相談対応',
      business: '法人導入・業務用対応',
    },
    tools: {
      title: '作業効率を高める工具モデル',
      text1: 'DIY・整備・現場作業向けに使いやすさと実用性を重視したモデルです。',
      text2: '業務利用・メンテナンス相談にも対応しています。',
      support: 'メンテナンス相談対応',
      business: '業務用・現場導入対応',
    },
    outdoor: {
      title: 'アウトドア・レジャー向けモデル',
      text1: 'キャンプ・防災・レジャーなど幅広いシーンで活用できる人気モデルです。',
      text2: '収納性・持ち運びやすさ・使いやすさを重視しています。',
      support: '日本国内発送対応',
      business: 'イベント・業務利用対応',
    },
    lifestyle: {
      title: '暮らしを快適にする生活用品',
      text1: '収納・整理・インテリア性を重視した生活向けアイテムです。',
      text2: '家庭・オフィス・倉庫など幅広い用途に対応しています。',
      support: '生活空間向け設計',
      business: '法人・事務所利用対応',
    },
    digital: {
      title: '便利なデジタル周辺機器',
      text1: 'スマホ・タブレット・PC周辺で使いやすい便利アイテムです。',
      text2: '持ち運びやすさと日常利用の快適性を重視しています。',
      support: '軽量・コンパクト設計',
      business: '日常・オフィス利用対応',
    },
    parts: {
      title: '交換・保守向け部品',
      text1: '交換・保守・メンテナンス用途向けの部品・消耗品です。',
      text2: '継続利用を想定した部品供給・相談にも対応しています。',
      support: '部品・保守相談対応',
      business: '継続メンテナンス対応',
    },
  };

  return map[product.type] || map.tools;
}

function HaigeStyleIntro({ product }) {
  return (
    <section className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 bg-zinc-900 px-8 py-6 text-white">
        <p className="text-sm font-black tracking-widest text-sky-300">
          PROFESSIONAL QUALITY
        </p>
        <h3 className="mt-2 text-4xl font-black leading-tight">
          {getTypeContent(product).title}
        </h3>
      </div>

      <div className="grid gap-10 p-8 lg:grid-cols-2 lg:items-center">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="h-[420px] w-full rounded-3xl object-cover"
          />
        </div>

        <div>
          <div className="mb-5 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-600">
            HAIGE STYLE DETAIL
          </div>

          <h3 className="mb-6 text-4xl font-black leading-tight text-zinc-900">
            {product.title}
          </h3>

          <div className="space-y-4 text-zinc-600 leading-8">
            <p>
              {getTypeContent(product).text1}
              小松商事では、日本国内発送・サポート対応を重視しています。
            </p>

            <p>
              {getTypeContent(product).text2}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="mb-2 text-sm font-black text-sky-700">
                SUPPORT
              </p>
              <h4 className="mb-2 text-xl font-black">
                {getTypeContent(product).support}
              </h4>
              <p className="text-sm leading-relaxed text-zinc-600">
                部品・消耗品・メンテナンス相談にも対応。
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="mb-2 text-sm font-black text-sky-700">
                BUSINESS
              </p>
              <h4 className="mb-2 text-xl font-black">
                {getTypeContent(product).business}
              </h4>
              <p className="text-sm leading-relaxed text-zinc-600">
                業務導入・まとめ買い・継続仕入れ相談可能。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductSpecIcons() {
  const specs = [
    { title: '国内発送', text: '日本国内より発送対応' },
    { title: '法人対応', text: '見積・まとめ買い相談可能' },
    { title: '部品相談', text: '交換部品・修理相談対応' },
    { title: 'サポート', text: 'LINE・メール対応' },
  ];

  return (
    <section className="mt-8 grid gap-4 md:grid-cols-4">
      {specs.map((item) => (
        <div key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-lg font-black text-sky-700">
            ✓
          </div>
          <h4 className="mb-2 font-black text-zinc-900">{item.title}</h4>
          <p className="text-xs leading-relaxed text-zinc-500">{item.text}</p>
        </div>
      ))}
    </section>
  );
}

function ProductDescriptionBlocks({ product }) {
  return (
    <section className="mt-8 space-y-8">
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-200 bg-zinc-50 px-8 py-5">
          <p className="text-sm font-black text-sky-700">POINT 01</p>
          <h3 className="mt-1 text-2xl font-black">商品特徴</h3>
        </div>
        <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center">
          <img src={product.image} alt={product.title} className="h-[300px] w-full rounded-2xl object-cover" />
          <div>
            <h4 className="mb-4 text-3xl font-black leading-tight">{product.title}</h4>
            <p className="leading-8 text-zinc-600">
              {product.desc}
              日本国内発送・法人対応・部品相談など、実際の利用シーンを想定したサポートにも対応しています。
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-200 bg-zinc-50 px-8 py-5">
          <p className="text-sm font-black text-sky-700">POINT 02</p>
          <h3 className="mt-1 text-2xl font-black">安心サポート</h3>
        </div>
        <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h4 className="mb-4 text-3xl font-black leading-tight">購入後の相談にも対応</h4>
            <p className="leading-8 text-zinc-600">
              部品・消耗品・メンテナンス相談にも対応可能です。
              法人様の継続導入や、まとめ買い相談も受付しています。
            </p>
          </div>
          <img src={product.image} alt="support" className="h-[300px] w-full rounded-2xl object-cover" />
        </div>
      </div>
    </section>
  );
}

function LongProductDetail({ product, details }) {
  return <section className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"><div className="border-b border-zinc-200 bg-gradient-to-r from-zinc-900 to-zinc-800 px-8 py-6 text-white"><p className="mb-2 text-sm font-black text-sky-300">PRODUCT DETAIL</p><h3 className="text-3xl font-black leading-tight">商品詳細・スペック</h3></div><div className="p-7"><h3 className="mb-4 text-2xl font-black">商品説明・特徴</h3><div className="mb-6 grid gap-4 md:grid-cols-3"><DetailPoint title="日本国内発送" text="国内倉庫より発送対応。大型商品は営業所止め・法人配送対応。" /><DetailPoint title="部品・修理相談" text="消耗品・交換部品・修理相談にも対応可能。" /><DetailPoint title="法人見積対応" text="まとめ買い・継続仕入れ・業務用途も相談可能。" /></div><p className="mb-6 leading-relaxed text-zinc-600">{product.title}は、小松商事が厳選し、日本国内のお客様向けに販売する商品です。用途・在庫・配送条件・法人見積については、購入前にお問い合わせいただけます。</p><div className="mb-10 overflow-hidden rounded-2xl border border-zinc-200"><div className="grid lg:grid-cols-2"><div className="flex items-center justify-center bg-zinc-50 p-8"><img src={product.image} className="max-h-[420px] w-full object-contain" alt={product.title} /></div><div className="bg-white p-8"><div className="mb-6 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-600">PRODUCT POINT</div><h3 className="mb-5 text-3xl font-black leading-tight text-zinc-900">{product.title}</h3><div className="mb-6 grid gap-4">{details.features.map((feature) => <div key={feature} className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-700 text-sm font-black text-white">✓</div><p className="font-black text-zinc-800">{feature}</p></div>)}</div><div className="rounded-2xl bg-zinc-900 p-6 text-white"><p className="mb-2 text-sm font-black text-sky-300">POINT</p><p className="leading-relaxed text-zinc-200">実際の使用環境を想定した商品です。国内発送・相談対応・部品供給も含めた安心感を重視しています。</p></div></div></div></div><HaigeStyleIntro product={product} />
      <ProductSpecIcons />
      <FeatureCards product={product} />
      <ProductDescriptionBlocks product={product} /><div className="mb-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"><div className="border-b border-zinc-200 bg-zinc-50 px-8 py-5"><h4 className="text-2xl font-black">商品仕様一覧</h4></div><DetailedSpecTable specs={details.specs} /></div><NoticeBox shipping={details.shipping} /></div></section>;
}

function ProductFaq() {
  const faq = [
    {
      q: '配送はどのくらいかかりますか？',
      a: '在庫状況・配送地域により異なります。大型商品は営業所止めとなる場合があります。',
    },
    {
      q: '部品のみ購入できますか？',
      a: '対応可能な商品があります。お問い合わせください。',
    },
    {
      q: '法人見積できますか？',
      a: '可能です。継続仕入れ・まとめ買い相談にも対応しています。',
    },
  ];

  return (
    <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-black text-sky-700">FAQ</p>
        <h3 className="text-2xl font-black">よくある質問</h3>
      </div>

      <div className="space-y-4">
        {faq.map((item) => (
          <div key={item.q} className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="mb-2 font-black text-zinc-900">Q. {item.q}</p>
            <p className="text-sm leading-relaxed text-zinc-600">A. {item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RelatedProducts({ product, products, openProduct, addToCart, toggleWish, wishlist }) {
  const related = products.filter((item) => item.title !== product.title && (item.type === product.type || item.category === product.category)).slice(0, 4);
  if (related.length === 0) return null;
  return <section className="mt-8"><SectionTitle sub="RELATED ITEMS" title="関連商品" /><ProductGrid products={related} openProduct={openProduct} addToCart={addToCart} toggleWish={toggleWish} wishlist={wishlist} /></section>;
}

function DetailPoint({ title, text }) { return <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"><p className="mb-2 text-sm font-black text-sky-700">FEATURE</p><h4 className="font-black">{title}</h4><p className="mt-2 text-sm leading-relaxed text-zinc-600">{text}</p></div>; }
function FeatureCards({ product }) { const cards = ['品質重視', '国内サポート対応', '法人導入対応']; return <div className="mb-10 grid gap-5 lg:grid-cols-3">{cards.map((title, index) => <div key={title} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"><img src={product.image} className="h-[220px] w-full object-cover" alt={title} /><div className="p-6"><p className="mb-2 text-sm font-black text-sky-700">FEATURE 0{index + 1}</p><h4 className="mb-3 text-2xl font-black">{title}</h4><p className="leading-relaxed text-zinc-600">用途に合わせた商品選定・相談対応・部品手配にも対応可能です。</p></div></div>)}</div>; }
function NoticeBox({ shipping }) { return <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"><div className="border-b border-zinc-200 bg-zinc-50 px-6 py-4"><h4 className="text-xl font-black">配送・注意事項</h4></div><div className="space-y-4 p-6 text-sm leading-relaxed text-zinc-700"><p>{shipping}</p><p>・大型商品は営業所止めとなる場合があります。</p><p>・在庫状況・納期については事前にお問い合わせください。</p><p>・法人様の継続仕入れ・まとめ買い相談も可能です。</p></div></div>; }

function ProductGrid({ products, openProduct, addToCart, toggleWish, wishlist }) { return <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.title} product={product} openProduct={openProduct} addToCart={addToCart} toggleWish={toggleWish} wishlist={wishlist} />)}</div>; }
function ProductCard({ product, openProduct, addToCart, toggleWish, wishlist }) { return <div className="group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:shadow-xl"><div className="flex h-56 items-center justify-center overflow-hidden border-b border-zinc-100 bg-white"><img src={product.image} alt={product.title} className="h-full w-full object-contain p-2.5 transition duration-500 group-hover:scale-105" /></div><div className="p-3.5"><div className="mb-2 flex flex-wrap items-start gap-2"><span className="rounded bg-amber-500 px-2 py-1 text-xs font-black text-white">{product.category}</span><button onClick={() => toggleWish(product)} className={`ml-auto text-xl font-black ${wishlist.includes(product.title) ? 'text-amber-500' : 'text-zinc-400'}`}>♡</button></div><h3 className="line-clamp-2 min-h-[48px] font-black leading-snug">{product.title}</h3><p className="mt-2 line-clamp-1 text-xs text-zinc-500">{product.desc}</p><div className="mt-3 flex gap-2 text-[11px] font-bold text-zinc-500"><span className="rounded bg-sky-50 px-2 py-1 text-sky-700">国内発送</span><span className="rounded bg-zinc-100 px-2 py-1">相談可</span></div><div className="mb-3 mt-4 flex items-end justify-between"><p className="text-2xl font-black text-sky-700">{product.price}</p><p className="text-xs text-zinc-400">税込</p></div><div className="grid grid-cols-2 gap-2"><button onClick={() => openProduct(product)} className="rounded-xl border border-sky-700 py-2 font-black text-sky-700 hover:bg-sky-700 hover:text-white">詳細</button><button onClick={() => addToCart(product)} className="rounded-xl bg-amber-500 py-2 font-black text-white hover:bg-amber-600">カート</button></div></div></div>; }
function SectionTitle({ sub, title, action, onAction }) { return <div className="mb-5 mt-8 flex items-end justify-between"><div><p className="text-sm font-black text-sky-700">{sub}</p><h2 className="text-2xl font-black">{title}</h2></div>{action && <button onClick={onAction} className="rounded-xl border bg-white px-5 py-2 text-sm font-bold">{action}</button>}</div>; }
function TrustRow() { return <section className="grid grid-cols-2 gap-4 py-5 md:grid-cols-4">{['国内発送', '日本語対応', '法人見積', '部品相談'].map((item) => <div key={item} className="rounded-xl border bg-white p-4 text-center font-black shadow-sm"><span className="text-sky-700">✓</span> {item}</div>)}</section>; }
function CategoryGrid({ categories, openCategory }) { return <section className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">{categories.map((category) => <div key={category.name} onClick={() => openCategory(category)} className="group cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="relative h-24 overflow-hidden bg-zinc-50"><img src={getCategoryImage(category)} alt={category.name} className="h-full w-full object-contain p-2.5 transition duration-500 group-hover:scale-105" /><div className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs font-black text-sky-700 shadow">{category.name.slice(0, 1)}</div></div><div className="p-3.5"><p className="text-[13px] font-black leading-snug">{category.name}</p><p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-zinc-500">{category.sub}</p><div className="mt-2 flex flex-wrap gap-1">{category.children?.slice(0, 2).map((child) => <span key={child} className="rounded bg-zinc-100 px-2 py-1 text-[10px] font-bold text-zinc-600">{child}</span>)}</div></div></div>)}</section>; }
function SubCategoryPanel({ categories, openCategory }) { return <section className="mb-10 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"><div className="mb-5"><p className="text-sm font-black text-sky-700">QUICK SEARCH</p><h2 className="text-xl font-black">細かいカテゴリから探す</h2></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{categories.map((category) => <div key={category.name} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"><button onClick={() => openCategory(category)} className="mb-3 text-left font-black text-zinc-900 hover:text-sky-700">{category.name}</button><div className="flex flex-wrap gap-2">{category.children?.map((child) => <button key={child} onClick={() => openCategory(category)} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-zinc-600 ring-1 ring-zinc-200 hover:bg-sky-50 hover:text-sky-700">{child}</button>)}</div></div>)}</div></section>; }
function NewsList({ notices }) { return <section className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"><div className="mb-4 flex items-end justify-between"><div><p className="text-sm font-black text-sky-700">NEWS</p><h2 className="text-2xl font-black">お知らせ</h2></div><button className="rounded-xl border bg-white px-4 py-2 text-sm font-bold">一覧を見る</button></div><div className="divide-y divide-zinc-100">{notices.map((notice, index) => <div key={notice} className="grid gap-2 py-3 text-sm md:grid-cols-[120px_1fr]"><span className="font-black text-zinc-500">2026.05.{22 - index}</span><span className="font-bold text-zinc-700">{notice}</span></div>)}</div></section>; }
function RankingSimple({ products, openProduct }) { const mixed = [products.find((p) => p.title.includes('テント')), products.find((p) => p.title.includes('テレビ台')), products.find((p) => p.title.includes('高圧洗浄機')), products.find((p) => p.title.includes('スマホ')), products.find((p) => p.title.includes('ラジコン草刈機'))].filter(Boolean); return <section className="mb-10"><SectionTitle sub="RANKING" title="ランキング" /><div className="grid gap-4 md:grid-cols-5">{mixed.map((product, index) => <button key={product.title} onClick={() => openProduct(product)} className="group overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition hover:shadow-lg"><div className="relative flex h-40 items-center justify-center bg-white"><img src={product.image} alt={product.title} className="h-full w-full object-contain p-3 transition group-hover:scale-105" /><div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-black text-white">{index + 1}</div></div><div className="p-3.5"><p className="line-clamp-2 min-h-[40px] text-sm font-black leading-snug">{product.title}</p><p className="mt-2 font-black text-sky-700">{product.price}</p></div></button>)}</div></section>; }
function ServiceBanners() { const items = [{ title: '配送', text: '国内倉庫より順次発送対応。大型商品も相談可能。', color: 'bg-sky-700' }, { title: '保証・相談', text: '初期不良・部品・消耗品相談にも対応。', color: 'bg-zinc-900' }, { title: '法人対応', text: 'まとめ買い・継続仕入れ・業務用相談可能。', color: 'bg-amber-500' }]; return <section className="mb-10 grid gap-5 md:grid-cols-3">{items.map((item) => <div key={item.title} className={`rounded-xl p-6 text-white shadow-lg ${item.color}`}><h3 className="mb-3 text-2xl font-black">{item.title}</h3><p className="text-sm leading-relaxed text-white/90">{item.text}</p></div>)}</section>; }
function InfoCard({ title, text, button, onClick }) { return <div className="rounded-xl border bg-white p-5 shadow-sm"><h3 className="mb-3 text-lg font-black">{title}</h3><p className="mb-4 text-sm leading-relaxed text-zinc-600">{text}</p><button onClick={onClick} className="w-full rounded-xl bg-amber-500 py-3 font-black text-white">{button}</button></div>; }
function GuideBlocks() { return <section className="mb-12 grid gap-5 lg:grid-cols-3"><div className="rounded-xl border bg-white p-6 shadow-sm"><h3 className="mb-4 text-xl font-black">配送について</h3><p className="text-sm leading-relaxed text-zinc-600">通常商品は日本国内より発送します。大型商品・農機具は営業所止め、または法人住所への配送となる場合があります。</p></div><div className="rounded-xl border bg-white p-6 shadow-sm"><h3 className="mb-4 text-xl font-black">返品・保証</h3><p className="text-sm leading-relaxed text-zinc-600">初期不良は商品到着後すぐにご連絡ください。商品状態・使用状況により対応内容が異なります。</p></div><div className="rounded-xl border bg-white p-6 shadow-sm"><h3 className="mb-4 text-xl font-black">よくある質問</h3><p className="text-sm leading-relaxed text-zinc-600"><b>Q.</b> 法人見積できますか？<br />A. 可能です。<br /><br /><b>Q.</b> 部品だけ注文できますか？<br />A. 対応可能な商品があります。</p></div></section>; }
function DetailedSpecTable({ specs }) { return <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">{specs.map(([label, value]) => <div key={label} className="grid border-b border-zinc-200 text-sm last:border-b-0 md:grid-cols-[220px_1fr]"><div className="bg-zinc-50 p-4 font-black text-zinc-900">{label}</div><div className="p-4 leading-relaxed text-zinc-700">{value}</div></div>)}</div>; }
function SideModal({ title, onClose, children }) { return <div className="fixed inset-0 z-[100] bg-black/40" onClick={onClose}><div className="absolute right-0 top-0 h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="mb-6 flex items-center justify-between"><h3 className="text-2xl font-black">{title}</h3><button onClick={onClose} className="text-2xl font-black text-zinc-400">×</button></div>{children}</div></div>; }
function LoginForm({ mode, setMode }) { const isLogin = mode === 'login'; return <div><div className="mb-6 grid grid-cols-2 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-1"><button onClick={() => setMode('login')} className={`rounded-lg py-3 text-sm font-black transition ${isLogin ? 'bg-sky-700 text-white shadow-sm' : 'text-zinc-600 hover:bg-white'}`}>ログイン</button><button onClick={() => setMode('register')} className={`rounded-lg py-3 text-sm font-black transition ${!isLogin ? 'bg-sky-700 text-white shadow-sm' : 'text-zinc-600 hover:bg-white'}`}>新規登録</button></div><div className="mb-6 rounded-xl bg-sky-50 p-4 text-sm leading-relaxed text-slate-900">{isLogin ? '会員ログインすると、注文履歴・お気に入り・見積相談を確認できます。' : '会員登録すると、法人見積・部品相談・お気に入り管理が利用しやすくなります。'}</div><div className="space-y-4">{!isLogin && <input className="w-full rounded-xl border px-4 py-3" placeholder="お名前" />}{!isLogin && <input className="w-full rounded-xl border px-4 py-3" placeholder="会社名（任意）" />}<input className="w-full rounded-xl border px-4 py-3" placeholder="メールアドレス" /><input className="w-full rounded-xl border px-4 py-3" placeholder="パスワード" type="password" />{!isLogin && <input className="w-full rounded-xl border px-4 py-3" placeholder="パスワード確認" type="password" />}<button className="w-full rounded-xl bg-sky-700 py-4 font-black text-white hover:bg-slate-800">{isLogin ? 'ログインする' : '会員登録する'}</button>{isLogin ? <button className="w-full rounded-xl border border-zinc-300 py-4 font-black text-zinc-700 hover:bg-zinc-50">パスワードをお忘れの方</button> : <button onClick={() => setMode('login')} className="w-full rounded-xl border border-zinc-300 py-4 font-black text-zinc-700 hover:bg-zinc-50">すでに会員の方はこちら</button>}</div></div>; }
function QuoteForm() { return <div className="space-y-4"><input className="w-full rounded-xl border px-4 py-3" placeholder="会社名 / お名前" /><input className="w-full rounded-xl border px-4 py-3" placeholder="メールアドレス" /><input className="w-full rounded-xl border px-4 py-3" placeholder="電話番号（任意）" /><select className="w-full rounded-xl border bg-white px-4 py-3"><option>相談内容を選択</option><option>まとめ買い</option><option>農機具導入相談</option><option>部品相談</option><option>OEM・業務用相談</option></select><textarea className="h-36 w-full rounded-xl border px-4 py-3" placeholder="現場条件・希望商品・数量など" /><button className="w-full rounded-xl bg-amber-500 py-4 font-black text-white">送信する</button></div>; }
function CartPanel({ items, total, removeFromCart, setQuoteOpen, updateQty }) { return <>{items.length === 0 ? <p className="rounded-xl border p-5 text-zinc-600">カートは空です。</p> : <div className="space-y-4">{items.map((item) => <div key={item.title} className="flex gap-3 rounded-xl border p-3"><img src={item.image} className="h-20 w-20 bg-zinc-50 object-contain" alt={item.title} /><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-black">{item.title}</p><p className="font-black text-sky-700">{item.price}</p><div className="mt-2 flex items-center gap-2"><button onClick={() => updateQty(item.title, -1)} className="h-8 w-8 rounded border">−</button><span className="font-black">{item.qty}</span><button onClick={() => updateQty(item.title, 1)} className="h-8 w-8 rounded border">＋</button><button onClick={() => removeFromCart(item.title)} className="ml-auto text-xs text-red-500">削除</button></div></div></div>)}<div className="flex justify-between border-t pt-4 text-xl font-black"><span>合計</span><span>{formatYen(total)}</span></div></div>}<button className="mt-5 w-full rounded-xl bg-sky-700 py-4 font-black text-white">レジに進む</button><button onClick={() => setQuoteOpen(true)} className="mt-3 w-full rounded-xl bg-amber-500 py-4 font-black text-white">この内容で見積相談</button></>; }
function Footer() { return <footer className="mt-10 bg-zinc-900 py-10 text-white"><div className="mx-auto grid max-w-[1440px] gap-8 px-5 md:grid-cols-4"><div className="md:col-span-2"><h4 className="mb-3 text-2xl font-black">小松商事株式会社</h4><p className="leading-relaxed text-zinc-400">農業機械・工具・日用品・アウトドア用品まで幅広く取り扱う、日本国内発送対応のセレクトECサイトです。</p></div><div className="leading-8 text-zinc-400"><p className="mb-2 font-black text-white">カテゴリ</p><p>農業機械</p><p>工具・DIY</p><p>日用品・生活雑貨</p></div><div className="leading-8 text-zinc-400"><p className="mb-2 font-black text-white">会社情報</p><p>大阪府八尾市 / 新潟県柏崎市</p><p>komatsusyouji.com</p><p>LINE・メール対応</p></div></div></footer>; }
