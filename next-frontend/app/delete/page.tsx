"use client"
import axios from "axios";
import { useState } from "react";

export default function Delete() {
	async function deleteData() {
		const [id, setId] = useState('');
		try {
			const response = await axios.delete("http://localhost:5000/student/"+id);
			console.log('Data deleted successfully');
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<center>
				<h2>Delete User</h2>
				<h3>Provide ID</h3>
				<form onSubmit={deleteData}>
					<table>
						<tr>
							<td>ID:</td>
							<td><input type="text" value={id} onChange={(e) => setId(e.target.value)} required /></td>
						</tr>
						<tr>
							<td><center><button type="submit">DELETE</button></center></td>
						</tr>
					</table>
				</form>
			</center>
		</>
	);
}
