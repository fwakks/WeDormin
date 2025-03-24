import ProfileTab from "./profile-tab";
import { Card } from "./ui/card";

function ProfileList({user}) {
    return (
        <div className="px-4 lg:px-6">
            <Card className="@container/card flex flex-col gap-4 md:gap-6">
                <ProfileTab tab="Name">{user.name}</ProfileTab>
                <ProfileTab tab="E-mail">{user.email}</ProfileTab>
                <ProfileTab tab="Age">{user.age}</ProfileTab>
                <ProfileTab tab="Gender">{user.gender}</ProfileTab>
                <ProfileTab tab="Major">{user.major}</ProfileTab>
                <ProfileTab tab="About Me">{user.about_me}</ProfileTab>
                <ProfileTab tab="Likes">{user.likes}</ProfileTab>
                <ProfileTab tab="Dislikes">{user.dislikes}</ProfileTab>
                <ProfileTab tab="Instagram">{user.instagram_username}</ProfileTab>
                <ProfileTab tab="Linkedin">{user.linkedin_link}</ProfileTab>
            </Card>
        </div>
    );
}

export default ProfileList;