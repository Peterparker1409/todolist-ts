import React, { useState } from 'react';

const TodoForm: React.FC<{}> = () => {
    const [showError, setShowError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTaskName, setEditTaskName] = useState("");
    const [editTaskIndex, setEditTaskIndex] = useState(-1);

    const [job, setJob] = useState<string>('');
    const inputRef = React.createRef<HTMLInputElement>();

    const [jobs, setJobs] = useState(() => {
        const jobsLocal = JSON.parse(localStorage.getItem('jobs') || '[]');
        return jobsLocal;
    });

    const validation = (name: string, value: string) => {
        if (name === 'job') {
            if (!value) {
                setShowError(true);
            } else {
                setShowError(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setJob(value);
        validation(name, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!job) {
            setShowError(true);
            return;
        }
        const newJob = {
            id: Math.ceil(Math.random() * 1000),
            name: job,
            completed: false,
        };
        setJobs([...jobs, newJob]);
        setJob('');
        setShowError(false);
        localStorage.setItem('jobs', JSON.stringify([...jobs, newJob]));
        inputRef.current?.focus();
    };

    const handleUpdate = (index: number) => {
        const updatedJobs = [...jobs];
        updatedJobs[index].name = editTaskName;
        setJobs(updatedJobs);
        localStorage.setItem("jobs", JSON.stringify(updatedJobs));
        setIsModalOpen(false);
        setEditTaskName("");
        setEditTaskIndex(-1);
    };

    return (
        <div>
            <h2 className='container mx-auto text-5xl text-center mt-9 font-bold text-indigo-600'>Todo List</h2>

            <form className='container mx-auto mt-9 flex w-min' onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type='text'
                    name='job'
                    onChange={handleChange}
                    value={job}
                    id='price'
                    className='block w-25 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    placeholder='  Thêm công việc '
                />
                <button className='rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white mx-4'>Add</button>
            </form>
            {showError ? (
                <p className='text-sm text-emerald-50 container mx-auto w-max mt-1 flex rounded-md bg-slate-700 p-2'>Thêm công việc không được để trống</p>
            ) : (
                <></>
            )}

            {jobs.length > 0 ? (
                <div className='container mx-auto mt-9 mb-3 flex flex-col gap-3 '>
                    {jobs.map((job, index) => (
                        <div
                            key={index}
                            className="container mx-auto  flex max-w-fit border p-4 rounded-md shadow-inner bg-neutral-50 items-center"
                        >
                            <span className='text-2xl mx-3 '>{index + 1} &nbsp;</span>
                            {isModalOpen && index === editTaskIndex ? (
                                <input
                                    type="text"
                                    value={editTaskName}
                                    onChange={(e) => setEditTaskName(e.target.value)}
                                    className="block w-25 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Edit task name"
                                />
                            ) : (
                                <span className={`text-2xl ${job.completed ? 'line-through' : ''}`}>{job.name}</span>
                            )}

                            <input
                                type="checkbox"
                                className="mx-4"
                                name=""
                                id=""
                                checked={job.completed}
                                onChange={(e) => {
                                    const newJobs = [...jobs];
                                    newJobs[index].completed = e.target.checked;
                                    setJobs(newJobs);
                                    localStorage.setItem('jobs', JSON.stringify(newJobs));
                                }}
                            />
                            <button
                                type="button"
                                id="button"
                                className="rounded-md bg-red-600 px-4 py-1.5 text-sm font-medium text-white mx-4"
                                onClick={() => {
                                    const newJobs = [...jobs];
                                    newJobs.splice(index, 1);
                                    setJobs(newJobs);
                                    localStorage.setItem('jobs', JSON.stringify(newJobs));
                                }}
                            >
                                Delete
                            </button>
                            {isModalOpen && index === editTaskIndex ? (
                                <button
                                    type="button"
                                    className="rounded-md bg-green-600 px-4 py-1.5 text-sm font-medium text-white mx-4"
                                    onClick={() => handleUpdate(index)}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="rounded-md bg-green-600 px-4 py-1.5 text-sm font-medium text-white mx-4"
                                    onClick={() => {
                                        setIsModalOpen(true);
                                        setEditTaskName(job.name);
                                        setEditTaskIndex(index);
                                    }}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className='container mx-auto text-base text-center mt-9 from-neutral-50 text-red-500'>Chưa có công việc vui lòng thêm !!!</h2>
            )}
          
        </div>
    );
};

export default TodoForm;
