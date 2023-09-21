import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { boardActions } from "../../toolkit/actions/board_action";
import { useDispatch, useSelector } from "react-redux";
import TableRow from "./TableRow";
import PageNavigation from "./PageNavigation";

const BoardList = () => {
  const { currentPage } = useParams();
  //  useParams() 함수를 통해 얻은 객체에서 currentPage라는 속성을 추출하는 코드
  const dispatch = useDispatch();
  // 리액트 프로젝트에서 Redux를 사용할 때 Redux store로부터 dispatch 함수를 추출하는 코드
  const getBoardList = (currentPage) => {
    dispatch(boardActions.getBoardList(currentPage));
  };

  /* 
  Redux의 주요 개념은 다음과 같습니다:

Store: 애플리케이션의 상태를 저장하는 중앙 저장소입니다.

Action: 상태 변경을 요청하는 객체입니다. 액션은 일반적으로 JavaScript 객체이며, 상태 변경의 유형과 함께 데이터를 포함합니다.

Reducer: 액션에 따라 상태를 어떻게 변경할지 정의하는 함수입니다. 이전 상태와 액션을 받아 새로운 상태를 반환합니다.

Dispatch: 액션을 Redux store로 보내는 함수입니다. dispatch 함수를 호출하면 액션을 store에 전달하고, 이에 따라 상태가 변경됩니다. */

  useEffect(() => {
    getBoardList(currentPage);
  }, []);

  const boardList = useSelector((state) => state.board.boardList);
  const pv = useSelector((state) => (state.board.pv ? state.board.pv : { currentPage: 1 }));

  return (
    <div>
      <Link className="btn btn-danger" to="/board/write">
        글쓰기
      </Link>
      <h3 className="text-center">게시판 목록</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <colgroup>
          <col width="8%" />
          <col width="*" />
          <col width="12%" />
          <col width="12%" />
        </colgroup>

        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>

        <tbody>
          {boardList &&
            boardList.map((board) => {
              return <TableRow board={board} key={board.num} />;
            })}
        </tbody>
      </table>

      {pv && <PageNavigation getBoardList={getBoardList} />}
    </div>
  );
};

export default BoardList;
