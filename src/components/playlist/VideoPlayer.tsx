import { Colors } from '@/utils/Constants';
import Video from 'react-native-video'
import { FC, useRef, useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import ScalePress from '../ui/ScalePress';
import { interactionStyles } from '@/styles/interactionStyles';
import { Anime } from '@/service/animeStore';

const VideoPlayer: FC<{ item: Anime }> = ({ item }) => {
    const ref = useRef(null);
    const [isPaused, setIsPaused] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleReadyForPlay = () => {
        setIsLoaded(true);
        setIsLoading(false);
    }

    const onPlayPress = () => {
        setIsPaused(false);
        setIsLoading(true);
    }

    return (
        <View style={interactionStyles.videoContainer}>
            <Video
                ref={ref}
                style={interactionStyles.video}
                allowsExternalPlayback
                playWhenInactive={false}
                playInBackground={false}
                paused={isPaused}
                shutterColor='transparent'
                hideShutterView
                controls={isLoaded} 
                onLoad={handleReadyForPlay}
                onError={(e) => console.log("VIDEO ERROR:", e, item?.stream_url)}
                source={{ uri: item?.stream_url }}
                resizeMode="contain"
            />
            
            {/* Overlay Image - Show until video is loaded */}
            {!isLoaded && (
                <View style={[interactionStyles.imageOverlay, { justifyContent: 'center', alignItems: 'center' }]}>
                     <Image 
                        source={{ uri: item?.thumbnail_url }} 
                        style={[interactionStyles.imageOverlay, { position: 'absolute' }]} 
                    />
                    
                    {/* Play Button - Show only if paused and not loading */}
                    {!isLoading && (
                        <ScalePress onPress={onPlayPress} style={{ zIndex: 10 }}>
                            <Ionicons name="play-circle" size={RFValue(60)} color={Colors.theme} />
                        </ScalePress>
                    )}

                    {/* Loading Spinner - Show if user clicked play but video hasn't loaded yet */}
                    {isLoading && (
                        <ActivityIndicator size="large" color={Colors.theme} style={{ zIndex: 10 }} />
                    )}
                </View>
            )}
        </View>
    );
}

export default VideoPlayer;
