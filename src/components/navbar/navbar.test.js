import React from "react";
import { render, screen } from "@testing-library/react"
import Navbar from "./navbar.component";

describe("<Navbar />", () => {
    it("should show User name on Navbar", () => {
        const userName = "Peter"
        render(<Navbar user={userName}/>)
        expect(screen.getByText("Hello, Peter")).toBeInTheDocument()
        expect(screen.getByText("Exit")).toBeInTheDocument()
    })
    it("should show 'Fazer Login' on Navbar", () => {
        const userName = null
        render(<Navbar user={userName}/>)
        expect(screen.getByText("Login")).toBeInTheDocument()
    })
})