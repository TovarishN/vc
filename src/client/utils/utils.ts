import { SetStateAction } from "react";

export type Setter<T> = {
	[P in keyof T & string as `set${P}`]: React.Dispatch<SetStateAction<T[P] | null>>;
};

export type StoreContext<T> = T & Setter<T>;