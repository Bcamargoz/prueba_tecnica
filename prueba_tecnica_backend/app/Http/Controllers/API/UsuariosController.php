<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use App\Usuarios;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuarios = Usuarios::all();

        return response()->json( $usuarios, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombres' => 'required|string|min:4',
            'apellidos' => 'required|string|min:4',
            'cedula' => 'required|unique:usuarios|numeric|min:8',
            'correo' => 'required|unique:usuarios|email',
            'telefono' => 'required|numeric|min:10'
        ]);

        $usuario = Usuarios::create($request->all());

        return response()->json([
            'error' => false,
            'user'  => $usuario,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $usuario = Usuarios::find($id);
        
        return response()->json([
            'error' => false,
            'user'  => $usuario,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombres' => 'required|string|min:4',
            'apellidos' => 'required|string|min:4',
            'cedula' => 'required|numeric|min:11',
            'correo' => 'required|email',
            'telefono' => 'required|numeric|min:10'
        ]);

        $usuario = Usuarios::find($id);

        if($usuario->cedula != $request->input('cedula')) {
            $request->validate([
                'cedula' => 'unique:usuarios'
            ]);
        }

        if($usuario->correo != $request->input('correo')) {
            $request->validate([
                'correo' => 'unique:usuarios'
            ]);
        }

        $usuario->nombres = $request->input('nombres');
        $usuario->apellidos = $request->input('apellidos');
        $usuario->cedula = $request->input('cedula');
        $usuario->correo = $request->input('correo');
        $usuario->telefono = $request->input('telefono');

        $usuario->save();
        
        return response()->json([
            'error' => false,
            'user'  => $usuario,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $usuario = Usuarios::find($id);
        $usuario->delete();

        return response()->json([
            'error' => false,
            'message'  => "El usuario ha sido eliminado",
        ], 200);
    }
}
