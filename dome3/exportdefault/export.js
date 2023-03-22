// export const exportVal = "这是export的值111";
// export const exportVal2 = "这是export的值2222";
// export const exportVal3 = "这是export的值333";

const exportVal = "这是export的值111";
const exportVal2 = "这是export的值2222";
const exportVal3 = "这是export的值333";

export { exportVal as val1, exportVal2 as val2, exportVal3 as val3 };

// 两种方式写法
// 可以写多个导出 也可以一起导出所有的，也可以使用别名