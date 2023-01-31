import { createSlice, createAsyncThunk, Action } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  endAt,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { RootState } from "../store";
import { db } from "../../services/fireBaseAuth";
import { showMessage, hideMessage } from "react-native-flash-message";

enum itemTypes {
  dairy,
  fruit,
  bakery,
  vegetable,
  vegan,
  meat,
}

export type items = {
  description: string;
  filename: string;
  height: number;
  id: number;
  price: number;
  rating: number;
  title: string;
  type: itemTypes;
  url_image: string | null;
  width: string;
  create_date: string;
};

interface initialStateInterface {
  list: [] | items[];
  status: "loading" | "reloading" | "loadingMore" | "completed";
  count: number;
  selected: null | items;
}

const initialState: initialStateInterface = {
  list: [],
  status: "loading",
  count: 0,
  selected: null,
};

const listSlice = createSlice({
  name: "listSlice",
  initialState,
  reducers: {
    setLoading: (state: initialStateInterface) => {
      state.list = [];
      state.status = "reloading";
    },
    setAdding: (state: initialStateInterface) => {
      state.status = "loadingMore";
    },
    setSelected: (state: initialStateInterface, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLists.fulfilled, (state, action: any) => {
      if (action.payload.adding) {
        state.list = [...state.list, ...action.payload.items];
        state.count = action.payload.count;
      } else {
        state.list = action.payload.items;
        state.count = action.payload.count;
      }
      state.status = "completed";
    }),
      builder.addCase(updateItem.pending, (state, action: any) => {
        state.list = [];
        state.status = "reloading";
      }),
      builder.addCase(deleteItem.pending, (state, action: any) => {
        state.list = [];
        state.status = "reloading";
      });
  },
});

export const list = (state: RootState) => state.list.list;
export const status = (state: RootState) => state.list.status;
export const count = (state: RootState) => state.list.count;
export const selected = (state: RootState) => state.list.selected;

export const { setLoading, setAdding, setSelected } = listSlice.actions;

interface params {
  page: number;
  lastIndex?: number;
}

export const getLists = createAsyncThunk("list/get", async (params: params) => {
  try {
    const ref = collection(db, "Items");
    const { page, lastIndex } = params;
    console.log({ page, lastIndex });

    if (lastIndex) {
      const count: any = await getCountFromServer(ref);
      console.log(count.data().count);

      const q = query(
        ref,
        orderBy("id", "asc"),
        startAt(lastIndex + 1),
        limit(10)
      );

      const querySnapshot = await getDocs(q);

      let state: any = [];

      console.log(querySnapshot);

      querySnapshot.forEach((doc) => {
        state.push(doc.data());
      });

      return {
        items: state ? state : [],
        count: count.data().count,
        adding: true,
      };
    } else {
      const count = await getCountFromServer(ref);
      console.log(count.data().count);

      const q = query(ref, orderBy("id", "asc"), limit(10));

      const querySnapshot = await getDocs(q);

      let state: any = [];

      console.log(querySnapshot);

      querySnapshot.forEach((doc) => {
        state.push(doc.data());
      });

      return {
        items: state ? state : [],
        count: count.data().count,
        adding: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
});

interface paramsUpdate {
  title: string;
  price: number;
  type: itemTypes;
  item: items;
}

export const updateItem = createAsyncThunk(
  "list/update",
  async (params: paramsUpdate) => {
    try {
      const { title, price, type, item } = params;
      console.log({ title, price, type, item });

      const ref = doc(db, "Items", String(item.id));

      const data: items = {
        create_date: item.create_date,
        description: item.description,
        filename: item.filename,
        height: item.height,
        width: item.width,
        id: item.id,
        price: price,
        type: type,
        title: title,
        rating: item.rating,
        url_image: item.url_image,
      };

      setDoc(ref, data).then((docRef) => {
        showMessage({
          message: "Successfully edited",
          type: "success",
        });
      });
    } catch (error) {
      showMessage({
        message: "Error when editing",
        type: "danger",
      });
      console.log(error);
    }
  }
);

interface paramsDelete {
  id: number;
}

export const deleteItem = createAsyncThunk(
  "list/delete",
  async (params: paramsDelete) => {
    try {
      const { id } = params;

      const ref = doc(db, "Items", String(id));

      deleteDoc(ref).then((docRef) => {
        showMessage({
          message: "Successfully deleted",
          type: "success",
        });
      });
    } catch (error) {
      showMessage({
        message: "Error when deleting",
        type: "danger",
      });
      console.log(error);
    }
  }
);

export default listSlice.reducer;

// try {
//     const citiesCol = collection(db, 'Items');

//     // const q = query(collection(db, "Items"), orderBy("id") , where("title", "==", "Green smoothie"));

//     // const querySnapshot = await getDocs(q);
//     // console.log(querySnapshot)
//     // querySnapshot.forEach((doc) => {
//     //   // doc.data() is never undefined for query doc snapshots
//     //   console.log(doc.data());
//     // });

//     let page = 1

//     let limits = 20

//     let initial = page == 1 ? 1 : (page * limits - 1)

//     let offset = page * 20

//     const q = query(citiesCol, where('type', '==', 'dairy'), limit(limits));

//     const array: any = []

//     const querySnapshot = await getDocs(q);
//     console.log(querySnapshot)
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       array.push(doc.data());
//       console.log(querySnapshot.size)
//     });

//     console.log(array)

//     console.log(citiesCol)

//     const citySnapshot = await getDocs(citiesCol);
//     const count = await getCountFromServer(citiesCol)
//     console.log(count.data().count)
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     console.log({ count: cityList.length, cityList, citySnapshot })
//   } catch (error) {
//     console.log(error)
//   }
