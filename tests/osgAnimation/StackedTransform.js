'use strict';
var QUnit = require( 'qunit' );
var mockup = require( 'tests/mockup/mockup' );
var Matrix = require( 'osg/Matrix' );
var Quat = require( 'osg/Quat' );
var StackedRotateAxis = require( 'osgAnimation/StackedRotateAxis' );
var StackedTranslate = require( 'osgAnimation/StackedTranslate' );
var StackedScale = require( 'osgAnimation/StackedScale' );
var StackedMatrix = require( 'osgAnimation/StackedMatrix' );
var StackedQuaternion = require( 'osgAnimation/StackedQuaternion' );


module.exports = function () {

    QUnit.module( 'osgAnimation' );

    QUnit.test( 'StackedRotateAxis', function () {

        var st = new StackedRotateAxis( 'rotateX' );
        ok( st.getName() === 'rotateX', 'Check name' );
        ok( mockup.checkNear( st._axis, [ 0.0, 0.0, 1.0 ] ), 'Check default axis' );
        ok( st._target.value === 0.0, 'Check default angle' );

        st.init( [ 1.0, 0.0, 0.0 ], 2.88 );
        ok( mockup.checkNear( st._axis, [ 1.0, 0.0, 0.0 ] ), 'Check axis after init' );
        ok( st._target.value === 2.88, 'Check angle after init' );

    } );

    QUnit.test( 'StackedTranslate', function () {

        var st = new StackedTranslate( 'translate' );
        ok( st.getName() === 'translate', 'Ckeck Name' );
        ok( mockup.checkNear( st._target.value, [ 0.0, 0.0, 0.0 ] ), 'Ckeck default translate' );

        st.init( [ 23, 78, 9.78 ] );
        ok( mockup.checkNear( st._target.value, [ 23, 78, 9.78 ] ), 'Check translate after init' );


    } );
    QUnit.test( 'StackedScale', function () {

        var st = new StackedScale( 'scale' );
        ok( st.getName() === 'scale', 'Ckeck Name' );
        ok( mockup.checkNear( st._target.value, [ 1.0, 1.0, 1.0 ] ), 'Check scale default value' );

        st.init( [ 1.0, 2.0, 3.0 ] );
        ok( mockup.checkNear( st._target.value, [ 1.0, 2.0, 3.0 ] ), 'Check scale value after init' );

    } );

    QUnit.test( 'StackedMatrix', function () {

        var st = new StackedMatrix( 'matrix' );
        ok( st.getName() === 'matrix', 'Check Name' );
        ok( Matrix.isIdentity( st._target.value ), 'Check default matrix' );

        var m = Matrix.makeTranslate( 4, 0, 0, Matrix.create() );
        st.init( m );
        ok( mockup.checkNear( m, st._target.value ), 'Check matrix value after init' );

    } );

    QUnit.test( 'StackedQuaternion', function () {

        var st = new StackedQuaternion( 'quat' );
        var q = Quat.create();
        ok( st.getName() === 'quat', 'Check Name' );
        ok( mockup.checkNear( st._target.value, q ), 'Check default quat value' );

        Quat.makeRotate( 0.45, 0, 0, 1, q );
        st.init( q );
        ok( mockup.checkNear( q, st._target.value ), 'Check quat value after init' );

    } );

};
