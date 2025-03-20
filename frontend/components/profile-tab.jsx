


function ProfileTab({ children, tab }) {
    return (<div className="px-4 lg:px-6">
        <div className="font-semibold">{tab}</div>
        <div className="text-8">{children}</div>
      </div>
    );
}

export default ProfileTab;