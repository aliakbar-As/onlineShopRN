import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    FlatList,
    Dimensions
} from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';

import { Search } from '../../components';
import { ProductCard } from '../../components/elements';

const baseUrl = 'https://dummyjson.com';

const { width } = Dimensions.get('window');


const sliderItems = [
    {
        id: 0,
        title: 'banner 1',
        image: 'https://freedesignfile.com/upload/2020/07/Online-Shopping-Banner-Mobile-App-Vector.jpg',
    },
    {
        id: 1,
        title: 'banner 2',
        image: 'https://img.freepik.com/premium-vector/online-shopping-banner_82574-3393.jpg?w=1060',
    },
    {
        id: 2,
        title: 'banner 3',
        image: 'https://t4.ftcdn.net/jpg/02/30/72/41/360_F_230724124_ZWlHSZBIvqvdJQj9at15WaKRqAtCUKTu.jpg',
    },
];

const Home = ({ navigation }) => {

    const [products, setProducts] = useState([]);

    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(5);

    const [searchValue, setSearch] = useState('');

    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        getProducts(5, 5);

    }, []);

    const getProducts = (limitData, skipData) => {
        // setRefreshing(true);
        axios.get(`${baseUrl}/products?limit=${limitData}&page=${skipData}`)
            .then(res => {
                fillData(res.data.products);

            }).catch(error => console.log('products Error', error));
    };


    const fillData = (data) => {
        console.log('data', data);

        if (products.length === 0) return setProducts(data);

        data.map(item => setProducts(products => [...products, item]))
        setRefreshing(false);
    };

    const _onEndReached = () => {

        setLimit(limit + 5);
        setSkip(skip + 5);


        getProducts(limit + 5, skip + 5);
    };


    const getSearchData = (value) => {
        setSearch(value);

        setTimeout(() => {

            axios.get(`${baseUrl}/products/search?q=${value}`)
                .then(res => {
                    console.log('RESPONSE', res.data.products);
                    setProducts(res.data.products);

                }).catch(err => console.log('search Err:', err));

        }, 2000);
    };

    return (
        <View style={styles.container}>


            <Search
                value={searchValue}
                onChangeText={(val) => getSearchData(val)}
                placeholder={'Search...'}
            />

            <FlatList
                ListHeaderComponent={() => (
                    <Swiper
                        key={sliderItems.length}
                        // autoplay
                        loop
                        dot={<View style={styles.dot} />}
                        activeDot={<View style={styles.activeDot} />}
                        height={200}>
                        {sliderItems.map(item => (
                            <Image
                                key={item.id}
                                source={{ uri: item.image }}
                                style={{ width: width, height: 200, alignSelf: 'center', }}
                            />
                        ))}
                    </Swiper>
                )}
                keyExtractor={(item, index) => index}
                data={products}
                extraData={products}
                onEndReachedThreshold={0.3}
                onEndReached={() => _onEndReached()}
                onRefresh={() => {
                    setProducts([]);
                    getProducts(5, 5)
                }}
                refreshing={refreshing}
                renderItem={({ item }) => {
                    const price = (item.price * item.discountPercentage) / 100;
                    return (
                        <ProductCard
                            priceConvertor={price}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            description={item.description}
                            brand={item.brand}
                            rating={item.rating}
                            price={item.price}
                            discountPercentage={item.discountPercentage}
                            onPress={() => navigation.navigate('details', { productItem: item })}
                        />
                    )
                }}
            />
        </View>
    );
}


const styles = {
    activeDot: {
        backgroundColor: 'yellow',
        width: 7,
        height: 7,
        borderRadius: 5,
        margin: 3
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 7,
        height: 7,
        borderRadius: 5,
        margin: 3
    },
    brand: {
        fontSize: 14,
        color: '#575757',
        textAlign: 'left',
    },
    ratingTitle: {
        fontSize: 10,
        color: '#575757',
        textAlign: 'left',
    },
    starView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    middleContainer: {
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 5,
    },
    discountTitle: {
        fontSize: 10,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    discountView: {
        backgroundColor: 'red',
        width: 40,
        height: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    realPriceTitle: {
        textAlign: 'left',
        color: '#505050',
        fontWeight: 'bold',
        fontSize: 14,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    description: {
        textAlign: 'left',
        fontSize: 16,
        color: '#575757'
    },
    priceTitle: {
        textAlign: 'left',
        color: '#2d2d2d',
        fontWeight: 'bold',
        fontSize: 14,
    },
    title: {
        textAlign: 'left',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    rightContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
        width: '63%'
    },
    productImage: {
        width: 120,
        height: 120,
        alignSelf: 'flex-start',
        borderRadius: 10
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        justifyContent: 'flex-start',

    },
    container: {
        flex: 1,
    }
}
export default Home;