const categoriesUrl = 'https://dummyjson.com/products/categories';
const productsUrl = 'https://dummyjson.com/products';

// دالة لجلب الفئات
async function getCategories() {
    try {
        const response = await fetch(categoriesUrl);
        const data = await response.json();
        console.log("Categories:", data); // تتبع الفئات في الكونسول
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// دالة لجلب المنتجات
async function getProducts() {
    try {
        const response = await fetch(productsUrl);
        const data = await response.json();
        console.log("Products:", data.products); // تتبع المنتجات في الكونسول
        return data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// دالة لجلب المنتجات وتصنيفها حسب الفئات
async function getProductsByCategories() {
    try {
        const categories = await getCategories();
        const products = await getProducts();

        const categorizedProducts = categories.map(category => ({
            category,
            products: products.filter(product => product.category === category),
        }));

        console.log("Categorized Products:", categorizedProducts); // تتبع المنتجات حسب الفئة في الكونسول
        return categorizedProducts;
    } catch (error) {
        console.error('Error fetching products by categories:', error);
    }
}

// دالة لعرض المنتجات المصنفة في الـ HTML
function displayProducts(categorizedProducts) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // مسح المحتوى القديم

    categorizedProducts.forEach(({ category, products }) => {
        // إنشاء عنصر الفئة
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.textContent = `الفئة: ${category}`;
        container.appendChild(categoryElement);

        // إنشاء عناصر المنتجات تحت كل فئة
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.textContent = `اسم المنتج: ${product.title}`;
            container.appendChild(productElement);
        });
    });
}

// استدعاء الدالة وعرض المنتجات
getProductsByCategories().then(categorizedProducts => {
    if (categorizedProducts) {
        displayProducts(categorizedProducts);
    } else {
        document.getElementById('products-container').textContent = 'حدث خطأ أثناء جلب البيانات.';
    }
});
