import React, { useEffect, useMemo, useState } from 'react';
import './shop.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../store/features/filterSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Spinner from '../../components/Spinner/Spinner';
import { FaSlidersH, FaSearch, FaTimes } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const Shop = () => {
    const dispatch = useDispatch();

    const { items, loading, error } = useSelector((state) => state.itemsReducer);
    const { categories } = useSelector((state) => state.categoriesReducer);
    const selectedCategory = useSelector((state) => state.filterReducer.selectedCategory);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [search, setSearch] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const minPrice = useMemo(() => {
        if (!items.length) return 0;
        return Math.min(...items.map((item) => Number(item.price)));
    }, [items]);

    const maxPrice = useMemo(() => {
        if (!items.length) return 0;
        return Math.max(...items.map((item) => Number(item.price)));
    }, [items]);

    useEffect(() => {
        if (items.length) {
            setPriceRange([minPrice, maxPrice]);
        }
    }, [items.length, minPrice, maxPrice]);

    useEffect(() => {
        if (selectedCategory && selectedCategory !== 'All') {
            setSelectedCategories([selectedCategory]);
        }
    }, [selectedCategory]);

    const toggleCategory = (categoryName) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryName)
                ? prev.filter((item) => item !== categoryName)
                : [...prev, categoryName]
        );
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSearch('');
        setSortValue('');
        setPriceRange([minPrice, maxPrice]);
        dispatch(setCategory('All'));
    };

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchesSearch = item.title
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                !selectedCategories.length ||
                selectedCategories.includes(item.category);

            const matchesPrice =
                Number(item.price) >= priceRange[0] &&
                Number(item.price) <= priceRange[1];

            const matchesHeaderCategory =
                !selectedCategory ||
                selectedCategory === 'All' ||
                item.category === selectedCategory;

            return matchesSearch && matchesCategory && matchesPrice && matchesHeaderCategory;
        });
    }, [items, search, selectedCategories, priceRange, selectedCategory]);

    const sortedItems = useMemo(() => {
        const copied = [...filteredItems];

        if (sortValue === 'Low') {
            copied.sort((a, b) => Number(a.price) - Number(b.price));
        }

        if (sortValue === 'High') {
            copied.sort((a, b) => Number(b.price) - Number(a.price));
        }

        if (sortValue === 'AZ') {
            copied.sort((a, b) => a.title.localeCompare(b.title));
        }

        return copied;
    }, [filteredItems, sortValue]);

    return (
        <div className="shop-page">
            <section className="shop-hero">
                <div className="page-container">
                    <div className="shop-hero__content">
                        <div className="shop-hero__text">
                            <div className="shop-badge">
                                <HiSparkles />
                                <span>Каталог мебели</span>
                            </div>

                            <h1>Подберите мебель для любого пространства</h1>

                            <p>
                                Современные модели для дома и офиса: удобные,
                                стильные и практичные решения для интерьера.
                            </p>
                        </div>

                        <div className="shop-hero__stats">
                            <div className="shop-stat-card">
                                <h3>{items.length}+</h3>
                                <p>товаров в каталоге</p>
                            </div>
                            <div className="shop-stat-card">
                                <h3>{categories.length}+</h3>
                                <p>категорий мебели</p>
                            </div>
                            <div className="shop-stat-card">
                                <h3>100%</h3>
                                <p>актуальный выбор</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shop-catalog">
                <div className="page-container">
                    <div className="shop-layout">
                        <aside className={`shop-sidebar ${isMobileFiltersOpen ? 'open' : ''}`}>
                            <div className="shop-sidebar__header">
                                <h3>Фильтры</h3>
                                <button
                                    type="button"
                                    className="sidebar-reset"
                                    onClick={resetFilters}
                                >
                                    Сбросить
                                </button>
                            </div>

                            <div className="shop-filter-block">
                                <p className="shop-filter-title">Категории</p>
                                <div className="shop-categories-list">
                                    <button
                                        type="button"
                                        className={`shop-category-chip ${selectedCategory === 'All' ? 'active' : ''}`}
                                        onClick={() => dispatch(setCategory('All'))}
                                    >
                                        Все товары
                                    </button>

                                    {categories.map((category) => (
                                        <label
                                            key={category.id}
                                            className={`shop-checkbox ${selectedCategories.includes(category.name) ? 'active' : ''}`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category.name)}
                                                onChange={() => toggleCategory(category.name)}
                                            />
                                            <span>{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="shop-filter-block">
                                <p className="shop-filter-title">Цена</p>

                                <div className="shop-price-box">
                                    <div className="shop-price-values">
                                        <span>от {priceRange[0]} сом</span>
                                        <span>до {priceRange[1]} сом</span>
                                    </div>

                                    <input
                                        type="range"
                                        min={minPrice}
                                        max={maxPrice}
                                        value={priceRange[0]}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            setPriceRange([Math.min(value, priceRange[1]), priceRange[1]]);
                                        }}
                                    />

                                    <input
                                        type="range"
                                        min={minPrice}
                                        max={maxPrice}
                                        value={priceRange[1]}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            setPriceRange([priceRange[0], Math.max(value, priceRange[0])]);
                                        }}
                                    />
                                </div>
                            </div>
                        </aside>

                        <div className="shop-main">
                            <div className="shop-toolbar">
                                <div className="shop-toolbar__left">
                                    <button
                                        type="button"
                                        className="mobile-filter-btn"
                                        onClick={() => setIsMobileFiltersOpen((prev) => !prev)}
                                    >
                                        <FaSlidersH />
                                        <span>Фильтры</span>
                                    </button>

                                    <div className="shop-search">
                                        <FaSearch />
                                        <input
                                            type="text"
                                            placeholder="Поиск по названию..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        {search && (
                                            <button
                                                type="button"
                                                className="search-clear-btn"
                                                onClick={() => setSearch('')}
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="shop-toolbar__right">
                                    <div className="shop-results-count">
                                        Найдено: <strong>{sortedItems.length}</strong>
                                    </div>

                                    <select
                                        value={sortValue}
                                        onChange={(e) => setSortValue(e.target.value)}
                                        className="shop-sort-select"
                                    >
                                        <option value="">Сортировка</option>
                                        <option value="Low">Сначала дешевые</option>
                                        <option value="High">Сначала дорогие</option>
                                        <option value="AZ">По названию</option>
                                    </select>
                                </div>
                            </div>

                            {loading ? (
                                <div className="shop-state-box">
                                    <Spinner />
                                </div>
                            ) : error ? (
                                <div className="shop-state-box shop-state-box--error">
                                    <p>😕 Ошибка: {error}</p>
                                    <span>Проверьте интернет и обновите страницу</span>
                                </div>
                            ) : sortedItems.length === 0 ? (
                                <div className="shop-state-box">
                                    <p>Товары не найдены</p>
                                    <span>Попробуйте изменить фильтры или поиск</span>
                                </div>
                            ) : (
                                <div className="shop-products-grid">
                                    {sortedItems.map((item) => (
                                        <ProductCard
                                            key={item.id}
                                            item={item}
                                            image={item.image}
                                            title={item.title}
                                            category={item.category}
                                            price={item.price}
                                            oldPrice={item.oldPrice}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Shop;
