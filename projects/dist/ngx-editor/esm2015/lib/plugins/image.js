import { ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { NodeSelection, Plugin, PluginKey } from 'prosemirror-state';
import { ImageViewComponent } from '../components/image-view/image-view.component';
class ImageRezieView {
    constructor(node, view, getPos, injector) {
        this.updating = false;
        this.handleResize = () => {
            if (this.updating) {
                return;
            }
            const { state, dispatch } = this.view;
            const { tr } = state;
            const transaction = tr.setNodeMarkup(this.getPos(), undefined, {
                src: this.imageComponentRef.instance.src,
                width: this.imageComponentRef.instance.outerWidth
            });
            const resolvedPos = transaction.doc.resolve(this.getPos());
            const newSelection = new NodeSelection(resolvedPos);
            transaction.setSelection(newSelection);
            dispatch(transaction);
        };
        const dom = document.createElement('image-view');
        const componentFactoryResolver = injector.get(ComponentFactoryResolver);
        this.applicationRef = injector.get(ApplicationRef);
        // Create the component and wire it up with the element
        const factory = componentFactoryResolver.resolveComponentFactory(ImageViewComponent);
        this.imageComponentRef = factory.create(injector, [], dom);
        // Attach to the view so that the change detector knows to run
        this.applicationRef.attachView(this.imageComponentRef.hostView);
        this.setNodeAttributes(node.attrs);
        this.imageComponentRef.instance.view = view;
        this.dom = dom;
        this.view = view;
        this.node = node;
        this.getPos = getPos;
        this.resizeSubscription = this.imageComponentRef.instance.imageResize.subscribe(() => {
            this.handleResize();
        });
    }
    computeChanges(prevAttrs, newAttrs) {
        return JSON.stringify(prevAttrs) === JSON.stringify(newAttrs);
    }
    setNodeAttributes(attrs) {
        this.imageComponentRef.instance.src = attrs.src;
        this.imageComponentRef.instance.alt = attrs.alt;
        this.imageComponentRef.instance.title = attrs.title;
        this.imageComponentRef.instance.outerWidth = attrs.width;
    }
    update(node) {
        if (node.type !== this.node.type) {
            return false;
        }
        this.node = node;
        const changed = this.computeChanges(this.node.attrs, node.attrs);
        if (changed) {
            this.updating = true;
            this.setNodeAttributes(node.attrs);
            this.updating = false;
        }
        return true;
    }
    ignoreMutation() {
        return true;
    }
    selectNode() {
        this.imageComponentRef.instance.selected = true;
    }
    deselectNode() {
        this.imageComponentRef.instance.selected = false;
    }
    destroy() {
        this.resizeSubscription.unsubscribe();
        this.applicationRef.detachView(this.imageComponentRef.hostView);
    }
}
const imagePlugin = (injector) => {
    return new Plugin({
        key: new PluginKey('link'),
        props: {
            nodeViews: {
                image: (node, view, getPos) => {
                    return new ImageRezieView(node, view, getPos, injector);
                },
            }
        }
    });
};
export default imagePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvcGx1Z2lucy9pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUEwQixNQUFNLGVBQWUsQ0FBQztBQUVqRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUlyRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUVuRixNQUFNLGNBQWM7SUFZbEIsWUFBWSxJQUFxQixFQUFFLElBQWdCLEVBQUUsTUFBb0IsRUFBRSxRQUFrQjtRQUY3RixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBdUNqQixpQkFBWSxHQUFHLEdBQVMsRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLE9BQU87YUFDUjtZQUVELE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0QyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDO1lBRXJCLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRTtnQkFDN0QsR0FBRyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBRztnQkFDeEMsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsVUFBVTthQUNsRCxDQUFDLENBQUM7WUFFSCxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUMzRCxNQUFNLFlBQVksR0FBRyxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVw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QztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDbkQsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FDRjtBQUVELE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBa0IsRUFBVSxFQUFFO0lBQ2pELE9BQU8sSUFBSSxNQUFNLENBQUM7UUFDaEIsR0FBRyxFQUFFLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUMxQixLQUFLLEVBQUU7WUFDTCxTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLENBQUMsSUFBcUIsRUFBRSxJQUFnQixFQUFFLE1BQW9CLEVBQUUsRUFBRTtvQkFDdkUsT0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDMUQsQ0FBQzthQUNGO1NBQ0Y7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixlQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vZGUgYXMgUHJvc2VNaXJyb3JOb2RlIH0gZnJvbSAncHJvc2VtaXJyb3ItbW9kZWwnO1xuaW1wb3J0IHsgTm9kZVNlbGVjdGlvbiwgUGx1Z2luLCBQbHVnaW5LZXkgfSBmcm9tICdwcm9zZW1pcnJvci1zdGF0ZSc7XG5pbXBvcnQgeyBFZGl0b3JWaWV3LCBOb2RlVmlldyB9IGZyb20gJ3Byb3NlbWlycm9yLXZpZXcnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEltYWdlVmlld0NvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvaW1hZ2Utdmlldy9pbWFnZS12aWV3LmNvbXBvbmVudCc7XG5cbmNsYXNzIEltYWdlUmV6aWVWaWV3IGltcGxlbWVudHMgTm9kZVZpZXcge1xuICBkb206IEhUTUxFbGVtZW50O1xuICB2aWV3OiBFZGl0b3JWaWV3O1xuICBnZXRQb3M6ICgpID0+IG51bWJlcjtcblxuICBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWY7XG4gIGltYWdlQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8SW1hZ2VWaWV3Q29tcG9uZW50PjtcbiAgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgbm9kZTogUHJvc2VNaXJyb3JOb2RlO1xuICB1cGRhdGluZyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5vZGU6IFByb3NlTWlycm9yTm9kZSwgdmlldzogRWRpdG9yVmlldywgZ2V0UG9zOiAoKSA9PiBudW1iZXIsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltYWdlLXZpZXcnKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciA9IGluamVjdG9yLmdldChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpO1xuICAgIHRoaXMuYXBwbGljYXRpb25SZWYgPSBpbmplY3Rvci5nZXQoQXBwbGljYXRpb25SZWYpO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBjb21wb25lbnQgYW5kIHdpcmUgaXQgdXAgd2l0aCB0aGUgZWxlbWVudFxuICAgIGNvbnN0IGZhY3RvcnkgPSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoSW1hZ2VWaWV3Q29tcG9uZW50KTtcblxuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZShpbmplY3RvciwgW10sIGRvbSk7XG4gICAgLy8gQXR0YWNoIHRvIHRoZSB2aWV3IHNvIHRoYXQgdGhlIGNoYW5nZSBkZXRlY3RvciBrbm93cyB0byBydW5cbiAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcodGhpcy5pbWFnZUNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICB0aGlzLnNldE5vZGVBdHRyaWJ1dGVzKG5vZGUuYXR0cnMpO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRSZWYuaW5zdGFuY2UudmlldyA9IHZpZXc7XG5cbiAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgdGhpcy5nZXRQb3MgPSBnZXRQb3M7XG5cbiAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHRoaXMuaW1hZ2VDb21wb25lbnRSZWYuaW5zdGFuY2UuaW1hZ2VSZXNpemUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlUmVzaXplKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNvbXB1dGVDaGFuZ2VzKHByZXZBdHRyczogUmVjb3JkPHN0cmluZywgYW55PiwgbmV3QXR0cnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocHJldkF0dHJzKSA9PT0gSlNPTi5zdHJpbmdpZnkobmV3QXR0cnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXROb2RlQXR0cmlidXRlcyhhdHRyczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWQge1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRSZWYuaW5zdGFuY2Uuc3JjID0gYXR0cnMuc3JjO1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRSZWYuaW5zdGFuY2UuYWx0ID0gYXR0cnMuYWx0O1xuICAgIHRoaXMuaW1hZ2VDb21wb25lbnRSZWYuaW5zdGFuY2UudGl0bGUgPSBhdHRycy50aXRsZTtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50UmVmLmluc3RhbmNlLm91dGVyV2lkdGggPSBhdHRycy53aWR0aDtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSA9ICgpOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy51cGRhdGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc3RhdGUsIGRpc3BhdGNoIH0gPSB0aGlzLnZpZXc7XG4gICAgY29uc3QgeyB0ciB9ID0gc3RhdGU7XG5cbiAgICBjb25zdCB0cmFuc2FjdGlvbiA9IHRyLnNldE5vZGVNYXJrdXAodGhpcy5nZXRQb3MoKSwgdW5kZWZpbmVkLCB7XG4gICAgICBzcmM6IHRoaXMuaW1hZ2VDb21wb25lbnRSZWYuaW5zdGFuY2Uuc3JjLFxuICAgICAgd2lkdGg6IHRoaXMuaW1hZ2VDb21wb25lbnRSZWYuaW5zdGFuY2Uub3V0ZXJXaWR0aFxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzb2x2ZWRQb3MgPSB0cmFuc2FjdGlvbi5kb2MucmVzb2x2ZSh0aGlzLmdldFBvcygpKTtcbiAgICBjb25zdCBuZXdTZWxlY3Rpb24gPSBuZXcgTm9kZVNlbGVjdGlvbihyZXNvbHZlZFBvcyk7XG5cbiAgICB0cmFuc2FjdGlvbi5zZXRTZWxlY3Rpb24obmV3U2VsZWN0aW9uKTtcbiAgICBkaXNwYXRjaCh0cmFuc2FjdGlvbik7XG4gIH1cblxuICB1cGRhdGUobm9kZTogUHJvc2VNaXJyb3JOb2RlKTogYm9vbGVhbiB7XG4gICAgaWYgKG5vZGUudHlwZSAhPT0gdGhpcy5ub2RlLnR5cGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuXG4gICAgY29uc3QgY2hhbmdlZCA9IHRoaXMuY29tcHV0ZUNoYW5nZXModGhpcy5ub2RlLmF0dHJzLCBub2RlLmF0dHJzKTtcbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgdGhpcy51cGRhdGluZyA9IHRydWU7XG4gICAgICB0aGlzLnNldE5vZGVBdHRyaWJ1dGVzKG5vZGUuYXR0cnMpO1xuICAgICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlnbm9yZU11dGF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc2VsZWN0Tm9kZSgpOiB2b2lkIHtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50UmVmLmluc3RhbmNlLnNlbGVjdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGRlc2VsZWN0Tm9kZSgpOiB2b2lkIHtcbiAgICB0aGlzLmltYWdlQ29tcG9uZW50UmVmLmluc3RhbmNlLnNlbGVjdGVkID0gZmFsc2U7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5hcHBsaWNhdGlvblJlZi5kZXRhY2hWaWV3KHRoaXMuaW1hZ2VDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICB9XG59XG5cbmNvbnN0IGltYWdlUGx1Z2luID0gKGluamVjdG9yOiBJbmplY3Rvcik6IFBsdWdpbiA9PiB7XG4gIHJldHVybiBuZXcgUGx1Z2luKHtcbiAgICBrZXk6IG5ldyBQbHVnaW5LZXkoJ2xpbmsnKSxcbiAgICBwcm9wczoge1xuICAgICAgbm9kZVZpZXdzOiB7XG4gICAgICAgIGltYWdlOiAobm9kZTogUHJvc2VNaXJyb3JOb2RlLCB2aWV3OiBFZGl0b3JWaWV3LCBnZXRQb3M6ICgpID0+IG51bWJlcikgPT4ge1xuICAgICAgICAgIHJldHVybiBuZXcgSW1hZ2VSZXppZVZpZXcobm9kZSwgdmlldywgZ2V0UG9zLCBpbmplY3Rvcik7XG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGltYWdlUGx1Z2luO1xuIl19