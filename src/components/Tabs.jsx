import React, { Children, useState } from 'react';

// const Tabs = ({ children }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//
//   const tabs = Children.toArray(children);
//   const activeTab = tabs[activeIndex];
//
//   return (
//     <div>
//       <div className="flex space-x-4 border-b">
//         {tabs.map((tab, index) => (
//           <button key={index} onClick={() => setActiveIndex(index)} className={`px-4 py-2 ${index === activeIndex ? 'border-b-2 border-blue-500 font-bold' : ''}`}>
//             {tab.props.title}
//           </button>
//         ))}
//       </div>
//
//       {/* Tab content */}
//       <div className="mt-4">{activeTab}</div>
//     </div>
//   );
// };
//
// // Single Tab component
// const Tab = ({ render }) => {
//   return render(); // Render prop pattern
// };

function Tabs({ children }) {
  const [current, setCurrent] = useState(0);
  const tabs = Children.toArray(children);
  const activeTab = tabs[current];

  return (
    <div>
      <div className="tabs">
        {tabs.map((tab, ind) => {
          return (
            <button className={`tab ${current === ind ? 'active-tab' : ''} `} onClick={() => setCurrent(ind)}>
              {tab.props.title}
            </button>
          );
        })}
      </div>
      {activeTab}
    </div>
  );
}

function Tab({ render }) {
  // render prop pattern
  return render();
}

export { Tabs, Tab };
