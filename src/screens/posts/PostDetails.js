import React, { useEffect, useState } from 'react';
import { FlatList, FlatListComponent, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Header } from "../../components";
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import { UserSection } from '../../components/elements';


const PostDetails = ({ navigation, route }) => {

    const { singlePost } = route.params;

    const [liked, setLiked] = useState(false);

    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getUserByPost();
        getCommentListOnPost();
    }, []);

    const getUserByPost = () => {
        axios.get(`https://dummyjson.com/users/${singlePost.userId}`)
            .then(res => {
                setUser(res.data);
            }).catch(err => console.error(err));
    };

    const getCommentListOnPost = () => {
        axios.get(`https://dummyjson.com/comments/post/${singlePost.id}`)
            .then(res => {
                setComments(res.data.comments);
            }).catch(err => console.error(err));
    };

    return (
        <View style={styles.container}>
            <Header title={'Post Detail'} />

            <ScrollView>

                <View style={styles.topSection}>
                    <UserSection
                        image={user.image}
                        fName={user.firstName}
                        lName={user.lastName}
                        email={user.email}
                    />


                    <Text style={styles.maintitle}>{singlePost.title}</Text>

                    <Text style={styles.destitle}>{singlePost.body}</Text>

                    <ScrollView horizontal style={{ marginVertical: 10 }}>
                        {singlePost.tags.map((item, index) => (
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
                                {singlePost.reactions}
                            </Text>

                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <FlatList
                    style={{ marginTop: '10%' }}
                    data={comments}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.commentCard}>
                                <Text style={styles.commentUsername}>{item.user.username}</Text>
                                <Text style={styles.datetitle}>22 october 2023</Text>
                                <Text style={styles.commentBody}>{item.body}</Text>
                            </View>
                        )
                    }}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    datetitle: {
        color: 'grey',
        fontSize: 12,
        marginVertical: 5
    },
    commentBody: {
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
    topSection: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc'
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

export default PostDetails;