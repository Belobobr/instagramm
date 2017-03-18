import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    ListView,
    TouchableOpacity,
} from 'react-native';
import Comment from './Comment';
import {CONTENT_MARGIN, ICON_SIZE} from './../constants/dimensions';

export default class CommentsPanel extends Component {

    constructor() {
        super();
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            showAll: false,
        }
    }

    render() {
        const comments = this.props.comments.data;
        const commentsLoading = this.props.comments.loading;
        const creatingComment = this.props.comments.creatingComment;
        const createdComment = this.props.comments.createdComment;
        const profile = this.props.profile.data;
        const dataSource = this.dataSource.cloneWithRows(this.state.showAll ? comments : comments.slice(-5));

        var commentsView = <ListView
            enableEmptySections={true}
            style={styles.comments}
            dataSource={dataSource}
            renderHeader={() => {
                return !this.state.showAll && comments.length > 10
                    ? <View style={styles.firstCommentsPanel}>
                        {comments.length > 0 && <Comment comment={comments[0]}/>}
                        <TouchableOpacity onPress={()=>{this.setState({showAll: true})}}>
                            <Text style={styles.showAllComments}>{'Show all comments'}</Text>
                        </TouchableOpacity>
                    </View>
                    : <View/>;
            }}
            renderRow={(rowData) => {
                return <Comment comment={rowData}/>
            }}
            renderFooter={() => {
                return creatingComment
                    ? <Comment comment={{
                    text: createdComment,
                    from: {full_name: profile.full_name, profile_picture: profile.profile_picture},
                    loading: true
                }}/>
                    : <View/>
            }}
        />;

        return commentsLoading
            ? <View style={styles.commentsLoadingContainer}>
            <ActivityIndicator indeterminate={true} size='large'/>
        </View>
            : commentsView;
    }
}

const styles = StyleSheet.create({
    comments: {
        flex: 1,
    },
    commentsLoadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstCommentsPanel: {
        flexDirection: "column"
    },
    showAllComments: {
        fontSize: 14,
        color: '#000a',
        marginLeft: 2 * CONTENT_MARGIN + ICON_SIZE,
    }
});




