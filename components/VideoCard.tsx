import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

// const video = {
//     "$collectionId": "66eaec68000f392f4f71",
//     "$createdAt": "2024-09-19T04:50:25.086+00:00",
//     "$databaseId": "66eaeb79001c990e411b",
//     "$id": "66ebad90003bfa41afa6",
//     "$permissions": [],
//     "$updatedAt": "2024-09-19T04:50:25.086+00:00",
//     "creator": {
//         "$collectionId": "66eaebe700040c9fecc2",
//         "$createdAt": "2024-09-19T02:20:29.469+00:00",
//         "$databaseId": "66eaeb79001c990e411b",
//         "$id": "66eb8a6b003bf13380cb",
//         "$permissions": ["read(\"user:66eb8a69003d6b0dba2a\")", "update(\"user:66eb8a69003d6b0dba2a\")", "delete(\"user:66eb8a69003d6b0dba2a\")"],
//         "$updatedAt": "2024-09-19T02:20:29.469+00:00",
//         "accountId": "66eb8a69003d6b0dba2a",
//         "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=Mishragini&project=66eae2d2001ae1aa3f10",
//         "email": "mishragini11@gmail.com",
//         "username": "Mishragini"
//     },
//     "prompt": "Create a motivating AI driven video aimed at inspiring coding enthusiasts with simple language",
//     "thumbnail": "https://i.ibb.co/tJBcX20/Appwrite-video.png",
//     "title": "Get inspired to code",
//     "video": "https://player.vimeo.com/video/949579770?h=897cd5e781"
// }

const VideoCard = ({ video }: any) => {
    const [play, setPlay] = useState(false);
    return (
        <View className="flex flex-col items-center px-4 mb-14">
            <View className="flex flex-row gap-3 items-start">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                        <Image
                            source={{ uri: video?.creator?.avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="flex justify-center flex-1 ml-3 gap-y-1">
                        <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}
                        >
                            {video?.title}
                        </Text>
                        <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}
                        >
                            {video?.creator?.username}
                        </Text>
                    </View>
                </View>

                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>

            {play ? (
                <Video
                    source={{ uri: video.video }}
                    className='w-full h-60 rounded-xl '
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onError={(error) => console.error("Video Error:", error)}
                    onPlaybackStatusUpdate={(status) => {
                        if (status.isLoaded && status.didJustFinish) {
                            setPlay(false)
                        }
                    }}
                />

            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
                >
                    <Image
                        source={{ uri: video?.thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                    />

                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;