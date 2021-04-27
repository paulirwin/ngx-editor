export const getSelectionNodes = (state) => {
    const nodes = [];
    const { selection: { from, to } } = state;
    state.doc.nodesBetween(from, to, node => {
        nodes.push(node);
    });
    return nodes;
};
export default getSelectionNodes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U2VsZWN0aW9uTm9kZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL2hlbHBlcnMvZ2V0U2VsZWN0aW9uTm9kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxLQUFrQixFQUFVLEVBQUU7SUFDOUQsTUFBTSxLQUFLLEdBQVcsRUFBRSxDQUFDO0lBRXpCLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFFMUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtRQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7QUFFRixlQUFlLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWRpdG9yU3RhdGUgfSBmcm9tICdwcm9zZW1pcnJvci1zdGF0ZSc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAncHJvc2VtaXJyb3ItbW9kZWwnO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0aW9uTm9kZXMgPSAoc3RhdGU6IEVkaXRvclN0YXRlKTogTm9kZVtdID0+IHtcbiAgY29uc3Qgbm9kZXM6IE5vZGVbXSA9IFtdO1xuXG4gIGNvbnN0IHsgc2VsZWN0aW9uOiB7IGZyb20sIHRvIH0gfSA9IHN0YXRlO1xuXG4gIHN0YXRlLmRvYy5ub2Rlc0JldHdlZW4oZnJvbSwgdG8sIG5vZGUgPT4ge1xuICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gIH0pO1xuXG4gIHJldHVybiBub2Rlcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFNlbGVjdGlvbk5vZGVzO1xuIl19