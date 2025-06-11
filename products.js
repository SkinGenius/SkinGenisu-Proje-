// Ürün veritabanı
const productsDatabase = {
    // Kuru Cilt için Ürünler
    dry: [
        {
            name: "Aloe Vera",
            type: "bitki",
            benefits: "Cildi nemlendirir, yatıştırır ve besler. Kuru ciltler için ideal bir nemlendiricidir.",
            usage: "Yapraklarından elde edilen jeli doğrudan cilde uygulayabilirsiniz.",
            skinTypes: ["Kuru", "Hassas"],
            effectLevel: 5,
            image: "aloe-vera.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin. İlk kullanımda küçük bir alanda test edin."
        },
        {
            name: "Hyaluronik Asit",
            type: "asit",
            benefits: "Cildin nem seviyesini artırır, kırışıklıkları azaltır ve cildi dolgunlaştırır.",
            usage: "Temiz cilde 2-3 damla uygulayın ve üzerine nemlendirici sürün.",
            skinTypes: ["Kuru", "Normal", "Hassas"],
            effectLevel: 5,
            image: "hyaluronic-acid.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Gül Suyu",
            type: "bitki",
            benefits: "Cildi nemlendirir, tonlar ve yatıştırır. Antioksidan özellikleri vardır.",
            usage: "Temiz cilde pamuk yardımıyla uygulayın.",
            skinTypes: ["Kuru", "Hassas", "Normal"],
            effectLevel: 4,
            image: "rose-water.jpg",
            precautions: "Kaliteli ve doğal gül suyu kullanın."
        },
        {
            name: "Shea Yağı",
            type: "bitki",
            benefits: "Cildi derinlemesine nemlendirir ve yumuşatır.",
            usage: "Temiz cilde masaj yaparak uygulayın.",
            skinTypes: ["Kuru", "Hassas"],
            effectLevel: 4,
            image: "shea-butter.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Avokado Yağı",
            type: "bitki",
            benefits: "Cildi nemlendirir ve besler.",
            usage: "Temiz cilde masaj yaparak uygulayın.",
            skinTypes: ["Kuru", "Hassas"],
            effectLevel: 4,
            image: "avocado-oil.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Jojoba Yağı",
            type: "yağ",
            benefits: "Cilt bariyerini güçlendirir, nem kaybını önler ve cildi yumuşatır.",
            usage: "Temiz cilde birkaç damla masaj yaparak uygulayın.",
            skinTypes: ["Kuru", "Hassas", "Normal"],
            effectLevel: 4,
            image: "jojoba-oil.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Seramid",
            type: "aktif",
            benefits: "Cilt bariyerini onarır ve nemi hapseder.",
            usage: "Serum veya krem formunda kullanın.",
            skinTypes: ["Kuru", "Hassas", "Normal"],
            effectLevel: 5,
            image: "ceramide.jpg",
            precautions: "Günlük kullanıma uygundur."
        },
        {
            name: "Azelaik Asit",
            type: "asit",
            benefits: "Sivilce ve kızarıklık görünümünü azaltır, gözenekleri temizler, kuru ciltlerde de nazikçe kullanılabilir.",
            usage: "Temiz ve kuru cilde ince bir tabaka halinde uygulayın.",
            skinTypes: ["Kuru", "Akneli", "Hassas"],
            effectLevel: 5,
            image: "azelaic-acid.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Centella Asiatica",
            type: "bitki",
            benefits: "Cildi yatıştırır, kızarıklığı ve sivilceyi azaltır, bariyer fonksiyonunu güçlendirir.",
            usage: "Serum veya krem formunda kullanın.",
            skinTypes: ["Kuru", "Akneli", "Hassas"],
            effectLevel: 4,
            image: "centella.jpg",
            precautions: "İlk kullanımda küçük bir alanda test edin."
        },
        {
            name: "Niasinamid (B3)",
            type: "vitamin",
            benefits: "Yağ üretimini dengeler, gözenekleri sıkılaştırır, sivilce oluşumunu azaltır ve cilt tonunu eşitler. Kuru ciltlerde düşük konsantrasyon tercih edilmelidir.",
            usage: "Temiz cilde 2-3 damla uygulayın.",
            skinTypes: ["Kuru", "Akneli", "Karma"],
            effectLevel: 4,
            image: "niacinamide.jpg",
            precautions: "C vitamini ile birlikte kullanmayın."
        },
        {
            name: "Çinko (Zinc PCA)",
            type: "aktif",
            benefits: "Sebum üretimini dengeler, sivilce oluşumunu önler, hassas ve kuru ciltlerde de kullanılabilir.",
            usage: "Serum veya krem olarak kullanın.",
            skinTypes: ["Kuru", "Akneli", "Hassas"],
            effectLevel: 4,
            image: "zinc.jpg",
            precautions: "Göz çevresine uygulamayın."
        },
        {
            name: "Panthenol (B5)",
            type: "vitamin",
            benefits: "Cildi nemlendirir, yatıştırır ve onarır, sivilce sonrası cilt yenilenmesini destekler.",
            usage: "Serum veya krem olarak kullanın.",
            skinTypes: ["Kuru", "Akneli", "Hassas"],
            effectLevel: 4,
            image: "panthenol.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "C Vitamini",
            type: "vitamin",
            benefits: "Lekeleri azaltır, cilt tonunu eşitler ve tüm cilt tiplerinde aydınlatıcı etki sağlar.",
            usage: "Temiz cilde 2-3 damla uygulayın, ardından nemlendirici kullanın.",
            skinTypes: ["Kuru", "Normal", "Yağlı", "Karma", "Hassas", "Leke"],
            effectLevel: 5,
            image: "vitamin-c.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Arbutin",
            type: "aktif",
            benefits: "Cilt tonunu eşitler, leke görünümünü azaltır, tüm cilt tiplerinde nazikçe kullanılabilir.",
            usage: "Serum olarak sabah ve akşam kullanın.",
            skinTypes: ["Kuru", "Normal", "Yağlı", "Karma", "Hassas", "Leke"],
            effectLevel: 5,
            image: "arbutin.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Mandelik Asit",
            type: "asit",
            benefits: "Cilt tonunu eşitler, nazik peeling sağlar, tüm cilt tiplerinde leke görünümünü azaltır.",
            usage: "Haftada 2-3 kez, temiz cilde uygulayın.",
            skinTypes: ["Kuru", "Normal", "Yağlı", "Karma", "Hassas", "Leke"],
            effectLevel: 4,
            image: "mandelic-acid.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Niasinamid (B3)",
            type: "vitamin",
            benefits: "Lekeleri azaltır, cilt tonunu eşitler, tüm cilt tiplerinde kullanılabilir. Kuru ciltlerde düşük konsantrasyon tercih edilmelidir.",
            usage: "Temiz cilde 2-3 damla uygulayın.",
            skinTypes: ["Kuru", "Normal", "Yağlı", "Karma", "Hassas", "Leke"],
            effectLevel: 4,
            image: "niacinamide.jpg",
            precautions: "C vitamini ile birlikte kullanmayın."
        },
        {
            name: "Traneksamik Asit",
            type: "asit",
            benefits: "Leke görünümünü azaltır, cilt tonunu eşitler, tüm cilt tiplerinde nazikçe kullanılabilir.",
            usage: "Serum olarak gece kullanın.",
            skinTypes: ["Kuru", "Normal", "Yağlı", "Karma", "Hassas", "Leke"],
            effectLevel: 4,
            image: "tranexamic-acid.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        }
    ],
    // Yağlı Cilt için Ürünler
    oily: [
        {
            name: "Çay Ağacı",
            type: "bitki",
            benefits: "Yağ üretimini dengeler, sivilce ve akne oluşumunu engeller.",
            usage: "Seyreltilmiş yağını cilde uygulayın.",
            skinTypes: ["Yağlı", "Akneli"],
            effectLevel: 5,
            image: "tea-tree.jpg",
            precautions: "Seyreltilmemiş yağı doğrudan kullanmayın."
        },
        {
            name: "Niasinamid (B3)",
            type: "vitamin",
            benefits: "Yağ üretimini dengeler, gözenekleri sıkılaştırır ve cilt tonunu eşitler.",
            usage: "Temiz cilde 2-3 damla uygulayın.",
            skinTypes: ["Yağlı", "Karma", "Akneli"],
            effectLevel: 5,
            image: "niacinamide.jpg",
            precautions: "C vitamini ile birlikte kullanmayın."
        },
        {
            name: "Bakuchiol",
            type: "aktif",
            benefits: "Yağlı ciltlerde kırışıklıkları azaltır, cildi yeniler ve yağ dengesini sağlar. Retinol alternatifi olarak kullanılabilir.",
            usage: "Gece rutininde, temiz cilde 2-3 damla uygulayın.",
            skinTypes: ["Yağlı", "Karma", "Hassas"],
            effectLevel: 5,
            image: "bakuchiol.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Matrixyl 3000",
            type: "aktif",
            benefits: "Yağlı ciltlerde kırışıklıkları azaltır, cilt elastikiyetini artırır ve yağ dengesini korur.",
            usage: "Serum olarak sabah ve akşam kullanın.",
            skinTypes: ["Yağlı", "Karma"],
            effectLevel: 4,
            image: "matrixyl.jpg",
            precautions: "Günlük kullanıma uygundur."
        },
        {
            name: "Yeşil Çay Ekstraktı",
            type: "bitki",
            benefits: "Yağlı cildi dengeleyen, antioksidan özellikleri ile kırışıklıkları önleyen ve cildi koruyan etkiye sahiptir.",
            usage: "Tonik olarak sabah ve akşam kullanın.",
            skinTypes: ["Yağlı", "Karma"],
            effectLevel: 4,
            image: "green-tea.jpg",
            precautions: "Kaliteli ve doğal yeşil çay ekstraktı kullanın."
        },
        {
            name: "Hyaluronik Asit (Düşük Moleküler)",
            type: "asit",
            benefits: "Yağlı ciltlerde nem dengesini sağlar, kırışıklıkları azaltır ve cildi dolgunlaştırır.",
            usage: "Temiz cilde 2-3 damla uygulayın.",
            skinTypes: ["Yağlı", "Karma"],
            effectLevel: 5,
            image: "hyaluronic-acid.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Resveratrol",
            type: "aktif",
            benefits: "Yağlı ciltlerde antioksidan etki gösterir, kırışıklıkları önler ve cildi korur.",
            usage: "Serum olarak sabah ve akşam kullanın.",
            skinTypes: ["Yağlı", "Karma"],
            effectLevel: 4,
            image: "resveratrol.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Peptit Kompleksi",
            type: "aktif",
            benefits: "Yağlı ciltlerde kırışıklıkları azaltır, cilt elastikiyetini artırır ve yağ dengesini korur.",
            usage: "Serum olarak gece rutininde kullanın.",
            skinTypes: ["Yağlı", "Karma"],
            effectLevel: 5,
            image: "peptides.jpg",
            precautions: "Günlük kullanıma uygundur."
        },
        {
            name: "Limon",
            type: "bitki",
            benefits: "Yağlı cildi dengeleyici ve parlaklık verici özellikleri vardır.",
            usage: "Suyunu seyrelterek tonik olarak kullanın.",
            skinTypes: ["Yağlı", "Karma"],
            effectLevel: 4,
            image: "lemon.jpg",
            precautions: "Güneşe çıkmadan önce kullanmayın."
        },
        {
            name: "Salicylic Asit",
            type: "asit",
            benefits: "Gözenekleri temizler ve sivilce oluşumunu engeller.",
            usage: "Temiz cilde uygulayın ve 5-10 dakika bekleyin.",
            skinTypes: ["Yağlı", "Akneli"],
            effectLevel: 5,
            image: "salicylic-acid.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Bentonit Kil",
            type: "bitki",
            benefits: "Yağlı cildi temizler ve gözenekleri sıkılaştırır.",
            usage: "Maske olarak uygulayın ve kuruduktan sonra yıkayın.",
            skinTypes: ["Yağlı", "Akneli"],
            effectLevel: 4,
            image: "bentonite-clay.jpg",
            precautions: "Aşırı kullanım cildi kurutabilir."
        },
        {
            name: "Çinko (Zinc PCA)",
            type: "aktif",
            benefits: "Sebum üretimini dengeler, sivilce oluşumunu önler.",
            usage: "Serum veya krem olarak kullanın.",
            skinTypes: ["Yağlı", "Akneli", "Karma"],
            effectLevel: 4,
            image: "zinc.jpg",
            precautions: "Göz çevresine uygulamayın."
        },
        {
            name: "Azelaik Asit",
            type: "asit",
            benefits: "Sivilce ve kızarıklık görünümünü azaltır, gözenekleri temizler.",
            usage: "Temiz cilde ince bir tabaka halinde uygulayın.",
            skinTypes: ["Yağlı", "Akneli", "Karma", "Hassas"],
            effectLevel: 5,
            image: "azelaic-acid.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Nane Yağı",
            type: "bitki",
            benefits: "Cildi ferahlatır, gözenekleri sıkılaştırır.",
            usage: "Seyreltilmiş olarak tonik şeklinde kullanın.",
            skinTypes: ["Yağlı", "Karma"],
            effectLevel: 3,
            image: "peppermint-oil.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        }
    ],
    // Karma Cilt için Ürünler
    combination: [
        {
            name: "Salatalık",
            type: "bitki",
            benefits: "Cildi nemlendirir ve yağ dengesini sağlar.",
            usage: "Rendelenmiş salatalığı maske olarak uygulayın.",
            skinTypes: ["Karma", "Normal"],
            effectLevel: 4,
            image: "cucumber.jpg",
            precautions: "Taze salatalık kullanın."
        },
        {
            name: "AHA (Glikolik Asit)",
            type: "asit",
            benefits: "Ölü hücreleri temizler, cilt tonunu eşitler ve gözenekleri sıkılaştırır.",
            usage: "Haftada 2-3 kez, temiz cilde uygulayın.",
            skinTypes: ["Karma", "Normal", "Yağlı"],
            effectLevel: 5,
            image: "glycolic-acid.jpg",
            precautions: "Güneş koruyucu kullanın ve güneşe maruz kalmaktan kaçının."
        },
        {
            name: "Yeşil Çay",
            type: "bitki",
            benefits: "Cildi yatıştırır ve antioksidan özellikleri vardır.",
            usage: "Çayını soğutup tonik olarak kullanın.",
            skinTypes: ["Karma", "Normal"],
            effectLevel: 4,
            image: "green-tea.jpg",
            precautions: "Kaliteli ve doğal yeşil çay kullanın."
        },
        {
            name: "Bal",
            type: "bitki",
            benefits: "Cildi nemlendirir ve besler.",
            usage: "Maske olarak uygulayın ve 15-20 dakika bekleyin.",
            skinTypes: ["Karma", "Normal"],
            effectLevel: 4,
            image: "honey.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Polihidroksi Asit (PHA)",
            type: "asit",
            benefits: "Nazik peeling etkisiyle cildi yeniler, nemlendirir.",
            usage: "Haftada 2-3 kez, temiz cilde uygulayın.",
            skinTypes: ["Karma", "Hassas", "Normal"],
            effectLevel: 4,
            image: "pha.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Üzüm Çekirdeği Yağı",
            type: "yağ",
            benefits: "Antioksidan etkisiyle cildi korur, hafif nemlendirir.",
            usage: "Gece rutininizde birkaç damla kullanın.",
            skinTypes: ["Karma", "Yağlı", "Normal"],
            effectLevel: 3,
            image: "grape-seed-oil.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        }
    ],
    // Hassas Cilt için Ürünler
    sensitive: [
        {
            name: "Papatya",
            type: "bitki",
            benefits: "Cildi yatıştırır ve kızarıklığı azaltır.",
            usage: "Çayını soğutup tonik olarak kullanın.",
            skinTypes: ["Hassas", "Kuru"],
            effectLevel: 4,
            image: "chamomile.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Centella Asiatica",
            type: "bitki",
            benefits: "Cildi yatıştırır, kızarıklığı azaltır ve bariyer fonksiyonunu güçlendirir.",
            usage: "Serum veya krem formunda kullanın.",
            skinTypes: ["Hassas", "Kuru", "Normal"],
            effectLevel: 5,
            image: "centella.jpg",
            precautions: "İlk kullanımda küçük bir alanda test edin."
        },
        {
            name: "Lavanta",
            type: "bitki",
            benefits: "Cildi yatıştırır ve rahatlatır.",
            usage: "Yağını seyrelterek cilde uygulayın.",
            skinTypes: ["Hassas", "Kuru"],
            effectLevel: 4,
            image: "lavender.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Yulaf Ezmesi",
            type: "bitki",
            benefits: "Cildi yatıştırır ve nemlendirir.",
            usage: "Maske olarak uygulayın ve 15-20 dakika bekleyin.",
            skinTypes: ["Hassas", "Kuru"],
            effectLevel: 4,
            image: "oatmeal.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Allantoin",
            type: "aktif",
            benefits: "Cildi yatıştırır, kızarıklığı ve tahrişi azaltır.",
            usage: "Serum veya krem olarak kullanın.",
            skinTypes: ["Hassas", "Kuru", "Normal"],
            effectLevel: 4,
            image: "allantoin.jpg",
            precautions: "Günlük kullanıma uygundur."
        },
        {
            name: "Skualen",
            type: "yağ",
            benefits: "Cildi nemlendirir ve yumuşatır, hassas ciltler için uygundur.",
            usage: "Temiz cilde birkaç damla uygulayın.",
            skinTypes: ["Hassas", "Kuru", "Normal"],
            effectLevel: 4,
            image: "squalane.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        }
    ],
    // Leke için Ürünler
    darkSpots: [
        {
            name: "C Vitamini",
            type: "vitamin",
            benefits: "Lekeleri azaltır ve cilt tonunu eşitler.",
            usage: "Temiz cilde 2-3 damla uygulayın.",
            skinTypes: ["Normal", "Karma"],
            effectLevel: 5,
            image: "vitamin-c.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Niacinamide",
            type: "vitamin",
            benefits: "Lekeleri azaltır ve cilt tonunu eşitler.",
            usage: "Temiz cilde 2-3 damla uygulayın.",
            skinTypes: ["Normal", "Karma"],
            effectLevel: 5,
            image: "niacinamide.jpg",
            precautions: "C vitamini ile birlikte kullanmayın."
        },
        {
            name: "Limon Suyu",
            type: "bitki",
            benefits: "Lekeleri azaltır ve cilt tonunu eşitler.",
            usage: "Seyreltilmiş su ile uygulayın.",
            skinTypes: ["Normal", "Karma"],
            effectLevel: 4,
            image: "lemon-juice.jpg",
            precautions: "Güneşe çıkmadan önce kullanmayın."
        },
        {
            name: "Arbutin",
            type: "aktif",
            benefits: "Cilt tonunu eşitler, leke görünümünü azaltır.",
            usage: "Serum olarak sabah ve akşam kullanın.",
            skinTypes: ["Normal", "Karma", "Yağlı"],
            effectLevel: 5,
            image: "arbutin.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Mandelik Asit",
            type: "asit",
            benefits: "Cilt tonunu eşitler, nazik peeling sağlar.",
            usage: "Haftada 2-3 kez, temiz cilde uygulayın.",
            skinTypes: ["Normal", "Karma", "Hassas"],
            effectLevel: 4,
            image: "mandelic-acid.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        }
    ],
    // Kızarıklık için Ürünler
    redness: [
        {
            name: "Papatya",
            type: "bitki",
            benefits: "Cildi yatıştırır ve kızarıklığı azaltır.",
            usage: "Çayını soğutup tonik olarak kullanın.",
            skinTypes: ["Hassas", "Kuru"],
            effectLevel: 4,
            image: "chamomile.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Lavanta",
            type: "bitki",
            benefits: "Cildi yatıştırır ve rahatlatır.",
            usage: "Yağını seyrelterek cilde uygulayın.",
            skinTypes: ["Hassas", "Kuru"],
            effectLevel: 4,
            image: "lavender.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Yeşil Çay",
            type: "bitki",
            benefits: "Cildi yatıştırır ve antioksidan özellikleri vardır.",
            usage: "Çayını soğutup tonik olarak kullanın.",
            skinTypes: ["Hassas", "Kuru"],
            effectLevel: 4,
            image: "green-tea.jpg",
            precautions: "Kaliteli ve doğal yeşil çay kullanın."
        },
        {
            name: "Aloe Vera",
            type: "bitki",
            benefits: "Cildi yatıştırır ve kızarıklığı azaltır.",
            usage: "Yapraklarından elde edilen jeli doğrudan cilde uygulayabilirsiniz.",
            skinTypes: ["Hassas", "Kuru"],
            effectLevel: 5,
            image: "aloe-vera.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Calendula",
            type: "bitki",
            benefits: "Cildi yatıştırır ve kızarıklığı azaltır.",
            usage: "Çayını soğutup tonik olarak kullanın.",
            skinTypes: ["Hassas", "Kuru"],
            effectLevel: 4,
            image: "calendula.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Çuha Çiçeği Yağı",
            type: "bitki",
            benefits: "Cildi yatıştırır ve kızarıklığı azaltır.",
            usage: "Temiz cilde masaj yaparak uygulayın.",
            skinTypes: ["Hassas", "Kuru"],
            effectLevel: 4,
            image: "evening-primrose-oil.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        },
        {
            name: "Beta Glukan",
            type: "aktif",
            benefits: "Cildi yatıştırır, kızarıklığı ve tahrişi azaltır.",
            usage: "Serum veya krem olarak kullanın.",
            skinTypes: ["Hassas", "Kuru", "Normal"],
            effectLevel: 4,
            image: "beta-glucan.jpg",
            precautions: "Günlük kullanıma uygundur."
        }
    ],
    // Kırışıklık için Ürünler
    wrinkles: [
        {
            name: "Retinol",
            type: "vitamin",
            benefits: "Kırışıklıkları azaltır ve cildi yeniler.",
            usage: "Gece rutininde kullanın.",
            skinTypes: ["Normal", "Karma"],
            effectLevel: 5,
            image: "retinol.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Hyaluronik Asit",
            type: "asit",
            benefits: "Cildin nem seviyesini artırır, kırışıklıkları azaltır ve cildi dolgunlaştırır.",
            usage: "Temiz cilde 2-3 damla uygulayın ve üzerine nemlendirici sürün.",
            skinTypes: ["Kuru", "Normal", "Hassas"],
            effectLevel: 5,
            image: "hyaluronic-acid.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "C Vitamini",
            type: "vitamin",
            benefits: "Kırışıklıkları azaltır ve cildi yeniler.",
            usage: "Temiz cilde 2-3 damla uygulayın.",
            skinTypes: ["Normal", "Karma"],
            effectLevel: 5,
            image: "vitamin-c.jpg",
            precautions: "Güneş koruyucu ile birlikte kullanın."
        },
        {
            name: "Peptitler",
            type: "aktif",
            benefits: "Cilt elastikiyetini artırır, kırışıklık görünümünü azaltır.",
            usage: "Serum veya krem olarak kullanın.",
            skinTypes: ["Normal", "Karma", "Kuru"],
            effectLevel: 5,
            image: "peptides.jpg",
            precautions: "Günlük kullanıma uygundur."
        },
        {
            name: "E Vitamini",
            type: "vitamin",
            benefits: "Antioksidan etkisiyle cildi korur, yaşlanma belirtilerini azaltır.",
            usage: "Serum veya krem olarak kullanın.",
            skinTypes: ["Normal", "Karma", "Kuru"],
            effectLevel: 4,
            image: "vitamin-e.jpg",
            precautions: "Alerjik reaksiyonlara dikkat edin."
        }
    ]
};

// Analiz sonuçlarını al
document.addEventListener('DOMContentLoaded', () => {
    // Analiz tarihini ayarla
    const now = new Date();
    document.getElementById('analysisDate').textContent = now.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // URL'den analiz sonuçlarını al
    const urlParams = new URLSearchParams(window.location.search);
    const analysisResults = JSON.parse(decodeURIComponent(urlParams.get('results') || '{}'));

    // Analiz sonuçlarına göre filtreleri otomatik seç
    setFiltersFromResults(analysisResults);

    // Sonuçlara göre ürünleri göster
    displayProducts(analysisResults);

    // Filtreleri dinle
    document.getElementById('skinConditionFilter').addEventListener('change', filterProducts);
    document.getElementById('issueFilter').addEventListener('change', filterProducts);
});

// Ürünleri filtrele
function filterProducts() {
    const skinCondition = document.getElementById('skinConditionFilter').value;
    const issue = document.getElementById('issueFilter').value;
    const tableBody = document.getElementById('plantsTableBody');
    tableBody.innerHTML = '';

    let products = [];

    // Tüm ürünleri birleştir
    const allProducts = Object.values(productsDatabase).flat();

    // Filtreleme fonksiyonu
    const filterBySkinType = (product) => {
        if (skinCondition === 'all') return true;
        
        // Cilt tipi eşleştirme haritası
        const skinTypeMap = {
            'dry': ['Kuru'],
            'oily': ['Yağlı'],
            'combination': ['Karma'],
            'sensitive': ['Hassas']
        };

        const targetTypes = skinTypeMap[skinCondition] || [];
        return product.skinTypes.some(type => targetTypes.includes(type));
    };

    const filterByIssue = (product) => {
        if (issue === 'all') return true;

        const issueKeywords = {
            'acne': ['sivilce', 'akne', 'yağlı', 'acne', 'pimple', 'oil', 'sebum', 'gözenek'],
            'wrinkles': ['kırışıklık', 'yaşlanma', 'anti-aging', 'wrinkle', 'aging', 'elastikiyet'],
            'darkSpots': ['leke', 'pigmentasyon', 'renk', 'spot', 'pigment', 'tone', 'aydınlatma'],
            'redness': ['kızarıklık', 'tahriş', 'hassas', 'yatıştırıcı', 'sakinleştirici', 'inflamasyon'],
            'dryness': ['kuru', 'nem', 'hidrasyon', 'dry', 'moisture', 'hydration', 'nemlendirici']
        };

        const keywords = issueKeywords[issue] || [];
        const productText = `${product.benefits} ${product.usage} ${product.name}`.toLowerCase();
        
        return keywords.some(keyword => productText.includes(keyword));
    };

    // Ürünleri filtrele
    products = allProducts.filter(product => filterBySkinType(product) && filterByIssue(product));

    // Tekrar eden ürünleri kaldır
    products = products.filter((item, index, arr) =>
        arr.findIndex(p => p.name === item.name) === index
    );

    // Ürünleri tabloya ekle
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="product-name">
                    <span class="product-type ${product.type}">${product.type}</span>
                    ${product.name}
                </div>
            </td>
            <td>${product.benefits}</td>
            <td>${product.usage}</td>
            <td>${product.skinTypes.join(', ')}</td>
            <td>
                <div class="effect-level">
                    ${'<span class="material-icons">star</span>'.repeat(product.effectLevel)}
                </div>
            </td>
        `;
        row.addEventListener('click', () => showProductDetail(product));
        tableBody.appendChild(row);
    });

    // Eğer hiç ürün bulunamadıysa mesaj göster
    if (products.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="5" class="no-products">
                Seçilen kriterlere uygun ürün bulunamadı. Lütfen farklı filtreler deneyin.
            </td>
        `;
        tableBody.appendChild(row);
    }
}

// Analiz sonuçlarına göre filtreleri ayarla
function setFiltersFromResults(results) {
    const skinConditionFilter = document.getElementById('skinConditionFilter');
    const issueFilter = document.getElementById('issueFilter');

    // Cilt tipine göre filtre seç
    if (results.skinType) {
        const skinType = results.skinType.toLowerCase();
        skinConditionFilter.value = skinType;
    }

    // Sorunlara göre filtre seç
    if (results.skinIssues && results.skinIssues.length > 0) {
        // Sorunları önceliklendir
        const priorityIssues = {
            'sivilce': 'acne',
            'akne': 'acne',
            'kırışıklık': 'wrinkles',
            'yaşlanma': 'wrinkles',
            'leke': 'darkSpots',
            'pigmentasyon': 'darkSpots',
            'kızarıklık': 'redness',
            'tahriş': 'redness',
            'kuru': 'dryness',
            'kuruluk': 'dryness'
        };

        // En önemli sorunu bul
        let selectedIssue = 'all';
        for (const issue of results.skinIssues) {
            const issueLower = issue.toLowerCase();
            for (const [keyword, filterValue] of Object.entries(priorityIssues)) {
                if (issueLower.includes(keyword)) {
                    selectedIssue = filterValue;
                    break;
                }
            }
            if (selectedIssue !== 'all') break;
        }

        issueFilter.value = selectedIssue;
    }

    // Nem ve yağ seviyesine göre ek filtreleme
    if (results.moistureLevel && results.moistureLevel < 30) {
        issueFilter.value = 'dryness';
    } else if (results.oilLevel && results.oilLevel > 70) {
        issueFilter.value = 'acne';
    }
}

// Ürünleri göster
function displayProducts(results) {
    const tableBody = document.getElementById('plantsTableBody');
    tableBody.innerHTML = '';

    // Cilt tipine göre ürünleri seç
    let products = [];
    if (results.skinType) {
        const skinType = results.skinType.toLowerCase();
        if (productsDatabase[skinType]) {
            products = productsDatabase[skinType];
        }
    }

    // Analiz sonuçlarına göre ek ürünler ekle
    if (results.skinIssues && results.skinIssues.length > 0) {
        const additionalProducts = getProductsForIssues(results.skinIssues);
        products = [...new Set([...products, ...additionalProducts])];
    }

    // Ürünleri tabloya ekle
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="product-name">
                    <span class="product-type ${product.type}">${product.type}</span>
                    ${product.name}
                </div>
            </td>
            <td>${product.benefits}</td>
            <td>${product.usage}</td>
            <td>${product.skinTypes.join(', ')}</td>
            <td>
                <div class="effect-level">
                    ${'<span class="material-icons">star</span>'.repeat(product.effectLevel)}
                </div>
            </td>
        `;

        // Satıra tıklama olayı ekle
        row.addEventListener('click', () => showProductDetail(product));
        tableBody.appendChild(row);
    });
}

// Sorunlara göre ürünleri getir
function getProductsForIssues(issues) {
    const allProducts = Object.values(productsDatabase).flat();
    const issueKeywords = {
        'sivilce': ['sivilce', 'akne', 'yağlı'],
        'kırışıklık': ['kırışıklık', 'yaşlanma', 'anti-aging'],
        'leke': ['leke', 'pigmentasyon', 'renk'],
        'kızarıklık': ['kızarıklık', 'tahriş', 'hassas'],
        'kuru': ['kuru', 'nem', 'hidrasyon']
    };

    return allProducts.filter(product => {
        const benefits = product.benefits.toLowerCase();
        const usage = product.usage.toLowerCase();

        return issues.some(issue => {
            const issueLower = issue.toLowerCase();
            for (const [keyword, keywords] of Object.entries(issueKeywords)) {
                if (issueLower.includes(keyword)) {
                    return keywords.some(k => benefits.includes(k) || usage.includes(k));
                }
            }
            return false;
        });
    });
}

// Ürün detaylarını göster
function showProductDetail(product) {
    const detailCard = document.getElementById('plantDetailCard');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Detay kartını doldur
    document.getElementById('plantName').textContent = product.name;
    // Ürün türünü göster
    if (!document.getElementById('plantType')) {
        const typeElem = document.createElement('div');
        typeElem.id = 'plantType';
        typeElem.className = 'product-type ' + product.type;
        document.getElementById('plantName').after(typeElem);
    }
    const typeElem = document.getElementById('plantType');
    typeElem.textContent = product.type;
    typeElem.className = 'product-type ' + product.type;

    // Ürün resmi varsa göster, yoksa gizle
    const imgElem = document.getElementById('plantImage');
    if (product.image && product.image.trim() !== '') {
        imgElem.src = product.image;
        imgElem.style.display = 'block';
    } else {
        imgElem.style.display = 'none';
    }
    document.getElementById('plantBenefits').textContent = product.benefits;
    document.getElementById('plantUsage').textContent = product.usage;
    document.getElementById('plantPrecautions').textContent = product.precautions;

    // Kartı ve overlay'i göster
    detailCard.style.display = 'block';
    overlay.classList.add('active');

    // Animasyon için class ekle
    detailCard.classList.add('show-modal');

    // Overlay'e tıklama olayı ekle
    overlay.addEventListener('click', closeProductDetail);
    // Kapatma tuşuna tıklama olayı ekle (her açılışta garanti olsun diye)
    const closeBtn = detailCard.querySelector('.close-detail');
    if (closeBtn) {
        closeBtn.onclick = closeProductDetail;
    }
}

// Ürün detaylarını kapat
function closeProductDetail() {
    const detailCard = document.getElementById('plantDetailCard');
    const overlay = document.querySelector('.overlay');
    detailCard.classList.remove('show-modal');
    detailCard.style.display = 'none';
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
    // Ürün türü alanını kaldır
    const typeElem = document.getElementById('plantType');
    if (typeElem) typeElem.remove();
}

// Sidebar işlemleri
document.getElementById('openSidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('active');
    document.getElementById('sidebarOverlay').classList.add('active');
});

document.getElementById('closeSidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
});

document.getElementById('sidebarOverlay').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
});

// Kullanıcı durumunu kontrol et
firebase.auth().onAuthStateChanged((user) => {
    const userProfile = document.getElementById('userProfile');
    const guestProfile = document.getElementById('guestProfile');

    if (user) {
        userProfile.style.display = 'block';
        guestProfile.style.display = 'none';
        document.getElementById('userName').textContent = user.displayName || 'Kullanıcı';
        document.getElementById('userEmail').textContent = user.email;
    } else {
        userProfile.style.display = 'none';
        guestProfile.style.display = 'block';
    }
});

// Çıkış yap
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Çıkış yapılırken hata oluştu:', error);
    });
} 