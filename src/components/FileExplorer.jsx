import { useState } from 'react';

export function FileExplorer({ files }) {
  return (
    <div>
      {files.map((file) => {
        return <File file={file} key={file.id} />;
      })}
    </div>
  );
}

function File({ file }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <span>
        <span>
          {file.name}
          {`    `}
        </span>
        {file.items?.length && <button onClick={() => setOpen((prev) => !prev)}>{open ? '-' : '+'}</button>}
      </span>
      <div style={{ paddingLeft: '16px', display: `${open ? 'block' : 'none'}` }}>{file.items && <FileExplorer files={file.items} />}</div>
    </div>
  );
}
