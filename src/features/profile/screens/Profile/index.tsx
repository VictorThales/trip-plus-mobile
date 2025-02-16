import * as React from 'react';

import * as S from './index.styles';
import { ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../../context/authContext';
import { useAuthStore } from '../../../../stores/useAuthStore';

export function Profile() {
  const [imageSelected, setSelectedImage] = React.useState('');
  const navigation = useNavigation();
  const { logout } = React.useContext(AuthContext);
  const user = useAuthStore((state) => state.user);
  const [userInfo] = React.useState(user);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        const imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  return (
    <S.Wrapper>
      <ScrollView>
        <S.CenteredView>
          <S.ImageButton>
            <S.StyledImage
              source={
                !imageSelected
                  ? {
                      uri: 'https://cdn-icons-png.flaticon.com/512/9131/9131521.png',
                    }
                  : { uri: imageSelected }
              }
            />
          </S.ImageButton>

          <Text onPress={() => openImagePicker()} style={{ marginTop: 10 }}>
            Alterar imagem
          </Text>
        </S.CenteredView>
        <S.IconWrapper>
          <Icon
            name="bar-chart"
            size={35}
            color="black"
            onPress={() => navigation.navigate('Statistics')}
          />
        </S.IconWrapper>
        <S.Section>
          <S.Label>Nome:</S.Label>
          <S.StyledTextInput placeholder="Nome" value={userInfo?.name} />
        </S.Section>
        <S.Section>
          <S.Label>Email:</S.Label>
          <S.StyledTextInput placeholder="Email" value={userInfo?.email} />
        </S.Section>
        <S.Section>
          <S.Label>País:</S.Label>
          <S.StyledTextInput placeholder="País" value={userInfo?.country} />
        </S.Section>

        <S.Section>
          <S.Label>Cidade:</S.Label>
          <S.StyledTextInput placeholder="Cidade" value={userInfo?.city} />
        </S.Section>
        <S.CenteredView>
          <S.AddButton disabled={true}>
            <S.AddButtonText>Salvar alterações</S.AddButtonText>
          </S.AddButton>
          <S.AddButton onPress={() => logout()}>
            <S.AddButtonText>Logout</S.AddButtonText>
          </S.AddButton>
        </S.CenteredView>
      </ScrollView>
    </S.Wrapper>
  );
}
