import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import MediaItem from './MediaItem';

export default class HashTagTab extends Component {

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    componentDidMount() {
        this.props.loadPhotoByHash();
    }

    render() {
        const dataSource = this.dataSource.cloneWithRows(this.props.hash.data);
        const content = <ListView
            enableEmptySections={true}
            contentContainerStyle={styles.list}
            dataSource={dataSource}
            renderRow={(rowData) => {
                return <MediaItem style={styles.item} uri={rowData.images.low_resolution.url}/>
            }}
        />;

        const loading = <View style={styles.loading}>
            <ActivityIndicator/>
        </View>;

        return this.props.hash.loading ? loading : content;
    }
}

const styles = StyleSheet.create({
    list: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        backgroundColor: '#ffffff',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});




