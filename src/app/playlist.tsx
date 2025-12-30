import React from 'react'
import { useRoute } from '@react-navigation/native'
import { Anime } from '@/service/animeStore'
import { commonStyles } from '@/styles/commonStyles'
import PlaylistHeader from '@/components/playlist/PlaylistHeader'
import VideoPlayer from '@/components/playlist/VideoPlayer'
import Interactions from '@/components/playlist/Interactions'
import { SafeAreaView } from 'react-native-safe-area-context'

const Page = () => {
  const route = useRoute() as any;
  const item = route?.params as Anime
  
  return (
    <SafeAreaView style={commonStyles.containerBlack}>
      <PlaylistHeader title={item.title} genre={item.genre}/>
      <VideoPlayer item={item}/>
      <Interactions item={item}/>
    </SafeAreaView>
  )
}

export default Page;