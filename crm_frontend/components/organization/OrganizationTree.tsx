import TreeNode from "./TreeNode";

export default function OrganizationTree({
  data,
  onDelete, // 🔥 thêm
  onUpdate,
}: {
  data: any[];
  onDelete: (id: number) => void;
   onUpdate: (id: number, name: string) => void;
}) {
  const buildTree = (list: any[]) => {
    const map: any = {};
    const roots: any[] = [];

    list.forEach((item) => {
      map[item.id] = { ...item, children: [] };
    });

    list.forEach((item) => {
      if (item.parentId) {
        map[item.parentId]?.children.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });

    return roots;
  };

  const treeData = buildTree(data);

  return (
    <div>
      {treeData.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          level={0}
          onDelete={onDelete} // 🔥 truyền xuống
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}