import { useContext } from 'react';
import './Profile.css';
import { Container } from 'reactstrap';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';
import { PostContext } from '../../store/PostContext';
import { FollowContext } from '../../store/FollowContext';
import Posts from '../Posts/Posts';
import { useSelector } from 'react-redux';

const Profile = () => {
   const { name, img, id } = useSelector(state => state.users.me);
   const { posts, deletePost } = useContext(PostContext);
   const { follows } = useContext(FollowContext);
   const myPosts = () => {
      return posts.filter(post => post.userId === id);
   };
   const myFollower = () => {
      return follows.filter(follow => follow.following === id);
   };
   const myFollowing = () => {
      return follows.filter(follow => follow.follower === id);
   };
   console.log([posts, myPosts()]);
   return (
      <>
         <ProfileHeader name={name}></ProfileHeader>
         <Container className="ProfileContainer">
            <ProfileBody img={img} follower={myFollower()} following={myFollowing()} posts={myPosts()}></ProfileBody>
            <Posts posts={myPosts()} name={name} img={img} deletePost={deletePost}></Posts>
         </Container>
      </>
   );
};

export default Profile;
