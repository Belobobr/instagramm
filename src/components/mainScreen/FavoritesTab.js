import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import MediaItem from './MediaItem';
import {HORIZONTAL_CONTENT_MARGIN} from '../../constants/dimensions';

export default class FavoritesTab extends Component {

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    componentDidMount() {
        this.props.loadFavorites();
    }

    render() {
        var media = this.props.media.data;
        var favoritesMedia = this.props.favorites.data.map((id) => {
            return media[id];
        });

        const dataSource = this.dataSource.cloneWithRows(favoritesMedia);
        const content = <ListView
            enableEmptySections={true}
            contentContainerStyle={styles.list}
            dataSource={dataSource}
            renderRow={(rowData) => {
                return <MediaItem style={styles.item} uri={rowData.images.low_resolution.url} mediaItemId={rowData.id} {...this.props}/>
            }}
        />;

        const loading = <View style={styles.loading}>
            <ActivityIndicator/>
        </View>;

        return this.props.favorites.loading ? loading : content;
    }
}

const styles = StyleSheet.create({
    list: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
    },
    item: {
        margin: HORIZONTAL_CONTENT_MARGIN,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});




