import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components";
import { useEffect, useState } from "react";
import axios from "axios";

const UserDetails = ({ navigation, route }) => {

    const { user } = route.params;

    const [userPosts, setUserPosts] = useState([]);
    // https://dummyjson.com/users/5/posts

    useEffect(() => {
        getUserPosts();
    }, []);

    const getUserPosts = () => {
        axios.get(`https://dummyjson.com/users/${user.id}/posts`)
            .then(res => {
                setUserPosts(res.data.posts);
            }).catch(err => console.error(err));
    };

    return (
        <View style={styles.container}>

            <Header title={user.domain} />

            <FlatList
                ListHeaderComponent={() => (
                    <View>

                        <Image
                            resizeMode="stretch"
                            style={styles.backgroundImageStyle}
                            source={{ uri: 'https://cdn.pixabay.com/photo/2020/03/21/19/27/sea-4955005_960_720.jpg' }}
                        />

                        <View style={styles.userInfoContainer}>
                            <Image
                                resizeMode="contain"
                                source={{ uri: user.image }}
                                style={styles.userImage}
                            />

                            <View style={{ marginLeft: 16 }}>
                                <Text style={styles.userInfoTitles}>{user.firstName} {user.lastName}</Text>
                                <Text style={{ color: '#fff' }}>{user.address.city}</Text>
                            </View>
                        </View>
                    </View>
                )}
                data={userPosts}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.posts}>
                            <Text style={styles.postTitles}>{item.title}</Text>

                            <ScrollView horizontal style={{ marginVertical: 10 }}>
                                {item.tags.map((item, index) => (
                                    <Text
                                        style={styles.tags}
                                        key={index}>#{item}</Text>
                                ))}
                            </ScrollView>

                            <Text style={styles.postDes}>{item.body}</Text>

                        </View>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 16,
        top: 16
    },
    userInfoTitles: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    userImage: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: 85, height: 85, borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: '#E6F1F7',
    },
    tags: {
        color: '#26E3C9',
        marginRight: 16,
        fontSize: 15,
    },
    postDes: {
        color: '#505050',
        fontSize: 16,
        textAlign: 'left',
    },
    postTitles: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    posts: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 10
    },
    backgroundImageStyle: {
        width: '100%',
        height: 300,
        alignSelf: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default UserDetails;