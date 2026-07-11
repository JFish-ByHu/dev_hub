import type { DataNode } from "antd/es/tree";

export const buildTree = (obj: unknown, currentPath = "root", name = "root"): DataNode => {
  const isArray = Array.isArray(obj);
  const isObject = obj !== null && typeof obj === "object" && !isArray;

  // 格式化不同类型的数值显示
  const renderNodeTitle = (keyName: string, valueType: string, metaInfo?: string) => (
    <span className="json-tree-node">
      <span className="json-key">"{keyName}"</span>:{" "}
      {metaInfo ? (
        <span className="json-meta">{metaInfo}</span>
      ) : (
        <span className={`json-val-${valueType}`}>{String(obj)}</span>
      )}
    </span>
  );

  if (isArray) {
    return {
      key: currentPath,
      title: renderNodeTitle(name, "array", `Array [${obj.length}]`),
      children: obj.map((item: unknown, index: number) =>
        buildTree(item, `${currentPath}[${index}]`, `${index}`)
      ),
    };
  }

  if (isObject) {
    const record = obj as Record<string, unknown>;
    const keys = Object.keys(record);
    return {
      key: currentPath,
      title: renderNodeTitle(name, "object", `Object {${keys.length}}`),
      children: keys.map((k) => buildTree(record[k], `${currentPath}.${k}`, k)),
    };
  }

  // 基础类型处理
  let valType = typeof obj as string;
  let displayObj = obj;
  if (obj === null) valType = "null";
  else if (valType === "string") displayObj = `"${obj}"`;

  // 对于非对象/数组类型，我们需要用 displayObj 重新包装 render
  const renderLeafTitle = (keyName: string, valueType: string) => (
    <span className="json-tree-node">
      <span className="json-key">"{keyName}"</span>:{" "}
      <span className={`json-val-${valueType}`}>{String(displayObj)}</span>
    </span>
  );

  return {
    key: currentPath,
    title: renderLeafTitle(name, valType),
    isLeaf: true,
  };
};
