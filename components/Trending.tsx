import { FlatList, TouchableOpacity, ImageBackground, Image, ViewToken } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useState } from 'react'
import { icons } from '@/constants';
import { Video, ResizeMode } from 'expo-av'

const zoomIn: Animatable.CustomAnimation = {
    from: {
        transform: [{ scale: 0.9 }]
    },
    to: {
        transform: [{ scale: 1.1 }]
    }
};

const zoomOut: Animatable.CustomAnimation = {
    from: {
        transform: [{ scale: 1.1 }]
    },
    to: {
        transform: [{ scale: 0.9 }]
    }
};

const TrendingItem = ({ activeItem, item }: {
    activeItem: any,
    item: any
}) => {
    const [play, setPlay] = useState(false);
    console.log(item.video)

    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <Video
                    source={{ uri: item.video }}
                    className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
                    resizeMode={ResizeMode.COVER}
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
                    className='relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => { setPlay(true) }}
                >
                    <ImageBackground
                        source={{
                            uri: item.thumbnail
                        }}
                        className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain'
                    />

                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending = ({ posts }: any) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewableItemsChanged = (info: {
        viewableItems: Array<ViewToken>;
    }) => {
        if (info.viewableItems.length > 0) {
            setActiveItem(info.viewableItems[0].item.$id);
        }
    };
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem
                    activeItem={activeItem}
                    item={item}
                />
            )}
            horizontal
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{
                x: 170,
                y: 0
            }}
        />
    )
}

export default Trending