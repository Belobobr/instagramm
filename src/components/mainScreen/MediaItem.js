import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import {
    HORIZONTAL_CONTENT_MARGIN,
} from '../../constants/dimensions';
var {width} = Dimensions.get('window');

export default class MediaItem extends Component {
    render() {
        return <Image
            style={styles.item}
            source={{uri: this.props.uri}}
        />
    }
}

const styles = StyleSheet.create({
    item: {
        margin: (HORIZONTAL_CONTENT_MARGIN / 2),
        width: (width / 2) - HORIZONTAL_CONTENT_MARGIN,
        height: (width / 2) - HORIZONTAL_CONTENT_MARGIN,
    },
});




