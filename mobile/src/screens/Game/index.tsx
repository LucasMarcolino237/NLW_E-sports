import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import { Entypo } from "@expo/vector-icons"
import { Image, Text, TouchableOpacity, View, FlatList } from "react-native";

import { styles } from './styles';
import { THEME } from '../../theme';
import  logoImg  from "../../assets/logo-nlw-esports.png";
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { GameCardProps } from '../../components/GameCard';
import { useState, useEffect } from 'react';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscorDuoSelected] = useState('')


  const route = useRoute();
  const navigation = useNavigation()
  
  const game = route.params as GameParams;
  
  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {

      fetch(`http://192.168.237.92:3333/ads/${adsId}/discord`)
        .then(res => res.json())
        .then(data => {
          setDiscorDuoSelected(data.discord)
        });
  
  }


  useEffect(() => {
    fetch(`http://192.168.237.92:3333/games/${game.id}/ads`)
      .then(res => res.json())
      .then(data => setDuos(data))
  }, [])


  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo
                name='chevron-thin-left'
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
              
            </TouchableOpacity>
            <Image
              source={logoImg}
              style={styles.logo}
            />
            <View style={styles.rigth}/>

          </View>

          <Image
            style={styles.cover}
            source={{uri: game.bannerUrl}}
            resizeMode='cover'
          />
          <Heading 
            title={game.title}
            subtitle='Conecte-se e comece a jogar'
          />
          <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard 
            data={item}
            onConnect={() => getDiscordUser(item.id)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anuncios publicados para esse jogo ainda.
            </Text>
          )}
          />

          <DuoMatch 
            visible={discordDuoSelected.length > 0 ? true : false}
            discord={discordDuoSelected}
            onCLose={() => setDiscorDuoSelected('')}
          />
        </SafeAreaView>
    </Background>
  );
}



