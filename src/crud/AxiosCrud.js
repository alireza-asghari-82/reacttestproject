import React, { useRef, useState, useEffect } from 'react'
import { Loading } from 'custom-components/Loading';
import Paging from 'custom-components/Paging';
import { UserCombo } from 'custom-components/UserCombo'
import { getAllAsync, insertAsync } from 'services/todoService'



export const AxiosCrud = () => {

    const pageItemCount = process.env.REACT_APP_PAGE_ITEM_COUNT;
    const [page,setPage] = useState(0);
    const [currentPage,setcurrentPage] = useState(0);
    const [user, setUserId] = useState();
    const [todos, setTodos] = useState([]);
    const [currentTodos,setCurrentTodos]=useState([]);
    const [totalCount, setTotalCount] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const isCompletedRef = useRef(false);
    const titleRef = useRef('');

    useEffect(async () => {
        const result = await getAllAsync();
        setTotalCount(result.length);
        setTodos(result);
        setIsLoading(false);
        setPage( Math.ceil(result.length  / pageItemCount));
        setCurrentTodos(result.slice(0,pageItemCount));
    }, [])
    
    const changePage = (i) => {
        setcurrentPage(i);
     const startItem = ((i - 1) *pageItemCount)+ 1;
     setCurrentTodos(todos.splice(startItem,pageItemCount))
    }
   
    const changeUser = (id) => {
        setUserId(id);
    }

    const save = (event) => {
        event.preventDefault();
    }

    return (
        <div className="card">
            <div className="card-header">مدیریت داده ها با Axios</div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <form onSubmit={(event) => save(event)}>
                            <div class="form-group">
                                <label>عنوان : </label>
                                <input ref={titleRef} type="text" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>کاربر : </label>
                                <UserCombo changeItem={changeUser} />
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" ref={isCompletedRef} className="ml-2" />
                                    کامل شده
                                </label>
                            </div>
                            <button type="submit" disabled={isLoading ? 'disabled' : ''} class="btn btn-primary">ذخیره</button>
                        </form>
                    </div>
                    <div className="col">
                    <div>
                            <nav aria-label="...">
                                <ul class="pagination">
                                    <Paging   pagecount={page} currentPage={currentPage} changePage={changePage} />
                                 
                                </ul>
                            </nav>
                        </div>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>شماره ردیف</th>
                                    <th>کد</th>
                                    <th>عنوان</th>
                                    <th>کاربر</th>
                                    <th>انجام شده</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTodos.map((item,index) =>
                                    <tr key={item.id} className={item.completed ? "completed-row" : ""}>
                                        {/* <td>{index + ((currentPage-1)*pageItemCount)+1}</td> */}
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.userId}</td>
                                        <td>{item.completed ? <span>✓</span> : <span>×</span>}</td>
                                        <td>-</td>
                                    </tr>)}
                            </tbody>
                            {isLoading ? <Loading /> : null}
                        </table>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}