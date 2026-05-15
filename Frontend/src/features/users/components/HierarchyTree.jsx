import React from 'react'

const HierarchyTree = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user._id} className="ml-5 border-l pl-3">
          <h2>{user.name}</h2>

          <p>{user.role}</p>
        </div>
      ))}
    </div>
  );
};

export default HierarchyTree;
