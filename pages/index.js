import DatePicker from "react-datepicker";
import React from 'react';
import ReactDOM from 'react-dom';
import Head from "next/head";
import moment from "moment";

export default function Home() {

    const [projectName ,setProjectName] = React.useState("");
    const [startDate ,setStartDate] = React.useState(new Date());
    const [listLength ,setListLength] = React.useState("16");

    const handleOnChange = function (setValue){
        return function (e){
            setValue(e.target.value)
        }
    }


    const intervals = [1,1,2,4,7];

    const workDays = [];
    let workday = 0
    for (let value of intervals){
        workday += value;
        workDays.push(workday);
    }

    let completedDay = intervals.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );

    let finalDay = parseInt(listLength) + completedDay;


    let ibinHouseArray = [];
    for (let day=1;day<=finalDay;day++){
        let todayPlan = [];
        for (let i =0;i<parseInt(listLength);i++){
            let todayNeedWork =  workDays.includes(day-i);
            if (todayNeedWork){
                todayPlan[i] = true;
            } else {
                todayPlan[i] = false;
            }
        }
        ibinHouseArray.push(todayPlan);
    }


    return (
        <React.Fragment>

            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <a className="navbar-brand" href="#">艾賓浩思計畫表</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            </nav>

            <main role="main" class="container">
                <form >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="projectName">專案名稱</label>
                            <input
                                type="text"
                                className="form-control"
                                value={projectName}
                                onChange={handleOnChange(setProjectName)}
                                id="projectName"
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="startDate">開始日期</label>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                id="startDate"
                                className={"form-control"}
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="listLength">List總數</label>
                            <input
                                type="number"
                                className="form-control"
                                value={listLength}
                                onChange={handleOnChange(setListLength)}
                                id="listLength"
                            />
                        </div>
                    </div>
                </form>

                <table className={"table table-striped table-bordered "}>
                    <thead>
                    <tr>
                        <td>日期/課程</td>
                        {
                            [...Array(listLength?parseInt(listLength):0).keys()].map((e,i)=><td key={i}>{i+1}</td>)
                        }
                    </tr>
                    {
                        [...Array(finalDay).keys()].map((none,day)=>{
                            return (
                                <tr>
                                    <td>{moment(startDate).add(day,"days").format("yyyy/MM/DD")}</td>
                                    {
                                        [...Array(listLength?parseInt(listLength):0).keys()].map((e,i)=><td key={i}>{
                                            ibinHouseArray[day][i]?"V":""
                                        }</td>)
                                    }
                                </tr>
                            );
                        })
                    }
                    </thead>
                    <tbody></tbody>
                </table>
            </main>
        </React.Fragment>
    )
}
