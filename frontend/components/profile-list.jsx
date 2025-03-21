import ProfileTab from "./profile-tab";
import { Card } from "./ui/card";

function ProfileList() {
    return (
        <div className="px-4 lg:px-6">
            <Card className="@container/card flex flex-col gap-4 md:gap-6">
                <ProfileTab tab="Name">Yessir</ProfileTab>
                <ProfileTab tab="E-mail">Yessir</ProfileTab>
                <ProfileTab tab="Instagram (optional)">Yessir</ProfileTab>
                <ProfileTab tab="Age">Yessir</ProfileTab>
                <ProfileTab tab="Gender">Yessir</ProfileTab>
                <ProfileTab tab="Major">Yessir</ProfileTab>
                <ProfileTab tab="Hobbies">Yessir</ProfileTab>
                <ProfileTab tab="Dislikes">Yessir</ProfileTab>
                <ProfileTab tab="Sleeping Habits">Yessir</ProfileTab>
                <ProfileTab tab="Pets?">Yessir</ProfileTab>
            </Card>
        </div>
    );
}

export default ProfileList;