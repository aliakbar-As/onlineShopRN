import React, { useState, useEffect } from 'react';
import { View, Dimensions, Image, Text, ScrollView, FlatList } from 'react-native';
import { Header, Button } from '../../components';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const baseUrl = 'https://dummyjson.com';


const { width } = Dimensions.get('window');

const ProductDetails = ({ navigation, route }) => {

    const { productItem } = route.params;

    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getCommentsList();
    }, []);


    const getCommentsList = () => {
        axios.get(`${baseUrl}/comments`)
            .then(res => {
                console.log('COMMENTS', res.data.comments);
                setComments(res.data.comments);
            }).catch(err => console.error(err));
    };

    return (
        <View style={styles.container}>
            <Header
                title={'Details'}
                backOnclick={() => navigation.pop()}
                liked={liked}
                likeOnclick={() => setLiked(!liked)}
            />
            <ScrollView>
                <View style={{ height: 200 }}>
                    <Swiper
                        key={productItem.images.length}
                        // autoplay
                        loop
                        dot={<View style={styles.dot} />}
                        activeDot={<View style={styles.activeDot} />}
                        height={200}>
                        {productItem.images.map((item, index) => (
                            <Image
                                resizeMode='stretch'
                                key={index}
                                source={{ uri: item }}
                                style={{ width: width, height: 200, alignSelf: 'center', }}
                            />
                        ))}
                    </Swiper>
                </View>


                <View style={styles.mainInfoContainer}>
                    <Text style={styles.mainTitle}>{productItem.title}</Text>


                    <View style={styles.ratingView}>
                        <Icon
                            name={'star'}
                            color={'yellow'}
                            size={15}
                            style={{ marginRight: 10 }}
                        />
                        <Text style={styles.ratingTitle}>{productItem.rating} ({productItem.stock})</Text>
                    </View>
                </View>

                <Text style={styles.infoTitles}>{productItem.brand} / {productItem.category}</Text>


                <Text style={styles.description}>
                    {productItem.description}
                </Text>






                <View style={styles.mainInfoContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceTitle}>${((productItem.price * productItem.discountPercentage) / 100).toFixed(1)}</Text>

                        <Text style={styles.realPrice}>${productItem.price}</Text>
                    </View>

                    <Button
                        style={{ width: '40%' }}
                        title={'Add'} />
                </View>




                <FlatList
                style={{marginTop: '10%'}}
                    ListHeaderComponent={() => (
                        <View style={styles.cHeaderView}>
                            <Text style={styles.headerTitle}>User Comments</Text>
                        </View>
                    )}
                    data={comments}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.commentCard}>
                                <Text style={styles.commentUsername}>{item.user.username}</Text>
                                <Text style={{color: 'grey', fontSize: 12}}>22 october 2023</Text>
                                <Text style={styles.commentBody}>{item.body}</Text>
                            </View>
                        )
                    }}
                />
            </ScrollView>
        </View>
    );
};

const styles = {
    commentBody :{
        color: '#505050',
        textAlign: 'left',
        fontSize: 14,

    },
    commentUsername: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 16
    },
    commentCard: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',

    },
    headerTitle: {
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        fontSize: 18
    },
    cHeaderView: {
        borderBottomWidth: 1,
        borderColor: '#eee',
        padding: 10,
        marginBottom: 16,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    mainInfoContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 16,
    },
    mainTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 18,
        color: '#000',
    },
    realPrice: {
        textAlign: 'left',
        color: '#2d2d2d',
        fontSize: 18,
        textDecorationLine: 'line-through',
        marginLeft: 10
    },

    priceTitle: {
        textAlign: 'center',
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',

    },
    ratingTitle: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'left',
    },
    ratingView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 10,
        marginTop: 16,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start'
    },
    description: {
        fontSize: 15,
        color: '#2d2d2d',
        textAlign: 'left',
        marginTop: 6,
        marginLeft: 10,
    },
    infoTitles: {
        fontSize: 14,
        color: '#434C99',
        textAlign: 'left',
        marginLeft: 10,
    },
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
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
}


export default ProductDetails;