import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {CONTENT_MARGIN, ICON_SIZE} from '../constants/dimensions'

export default class AddComment extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                this.props.onMakeComment();
            }}>
                <Image
                    style={styles.icon}
                    source={require('./../images/icon_make_comment.png')}
                />
            </TouchableOpacity>

            <View style={styles.messageInputContainer}>
                <Text style={styles.makeCommentTitle}>{'Make comment'}</Text>
                <TextInput
                    style={styles.makeCommentInput}
                    onChangeText={(text) => {this.props.onEnteringComment(text)}}
                    value={this.props.creatingComment ? '' : this.props.createdComment}
                    placeholder={'Enter your comment'}
                />
                <View style={styles.bottomBorder}/>
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
    messageInputContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: CONTENT_MARGIN,
    },
    makeCommentTitle: {
        fontSize: 12,
        color: '#000a',
    },
    makeCommentInput: {
        flex: 1,
    },
    bottomBorder: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    }

});




