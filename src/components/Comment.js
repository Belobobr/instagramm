import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import {CONTENT_MARGIN, ICON_SIZE} from '../constants/dimensions'
import moment from 'moment';

export default class Comment extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const comment = this.props.comment;
        const commentTime = moment(new Date(parseInt(comment.created_time) * 1000)).format('MMMM Do YYYY, h:mm:ss a');

        return <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                this.props.onSendPressed(this.state.text)
            }}>
                <Image
                    style={styles.icon}
                    source={{uri: comment.from.profile_picture}}
                />
            </TouchableOpacity>

            <View style={styles.messageContainer}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.author}>{comment.from.full_name}</Text>
                    {comment.loading
                        ? <ActivityIndicator indeterminate={true} size='small'/>
                        : <Text style={styles.date}>{commentTime}</Text>
                    }
                </View>
                <Text style={styles.comment}>{comment.text}</Text>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: CONTENT_MARGIN,
    },
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        marginTop: CONTENT_MARGIN,
        marginBottom: CONTENT_MARGIN,
    },
    messageContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: CONTENT_MARGIN,
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    comment: {
        fontSize: 12,
    },
    author: {
        fontSize: 14,
        color: '#2196F3',
    },
    date: {
        fontSize: 12,
        color: '#000a',
        alignSelf: 'flex-end',
    }
});




