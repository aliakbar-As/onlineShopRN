import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Header } from "../../components";
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';

const Posts = ({ navigation }) => {

    const [posts, setPosts] = useState([]);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        getPostList();
    }, []);

    const getPostList = () => {
        axios.get('https://dummyjson.com/posts')
            .then(res => {
                setPosts(res.data.posts);
            }).catch(err => console.error(err));
    };

    return (
        <View style={styles.container}>
            <Header primary title={'Posts'} />

            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('detail', { singlePost: item })}>
                            <View style={styles.postCard}>
                                <Text style={styles.maintitle}>{item.title}</Text>

                                <Text
                                    numberOfLines={5}
                                    style={styles.destitle}>{item.body}</Text>

                                <ScrollView horizontal style={{ marginVertical: 10 }}>
                                    {item.tags.map((item, index) => (
                                        <Text
                                            style={styles.tags}
                                            key={index}>#{item}</Text>
                                    ))}
                                </ScrollView>


                                <TouchableWithoutFeedback
                                    onPress={() => setLiked(!liked)}>
                                    <View style={styles.pView}>
                                        <Icon
                                            name={liked ? 'heart' : 'hearto'}
                                            size={20}
                                            color={liked ? 'red' : 'gray'}
                                        />

                                        <Text style={{ color: '#000', marginLeft: 10 }}>
                                            {item.reactions}
                                        </Text>

                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    destitle: {
        color: '#505050',
        textAlign: 'left',
        fontSize: 14,
        marginTop: 5
    },
    maintitle: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15,
    },
    pView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    postCard: {
        width: '95%',
        alignSelf: 'center',
        margin: 'auto',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        marginTop: 16,
        padding: 10
    },
    tags: {
        color: '#26E3C9',
        marginRight: 16,
        fontSize: 15,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
export default Posts;