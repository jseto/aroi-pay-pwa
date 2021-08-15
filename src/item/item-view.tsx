import { Item } from './item'

interface ItemViewProps {
	item: Item;
}

export function ItemView({ item }: ItemViewProps) {
	return (
		<div className="item-view">
			{ item.name }
		</div>
	)
}