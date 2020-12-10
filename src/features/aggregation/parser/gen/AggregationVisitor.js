/*******************************************************************************
 * #  MIT License
 * #
 * #  Copyright (c) 2020 OdinLabs IO
 * #
 * #  Permission is hereby granted, free of charge, to any person obtaining a copy
 * #  of this software and associated documentation files (the "Software"), to deal
 * #  in the Software without restriction, including without limitation the rights
 * #  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * #  copies of the Software, and to permit persons to whom the Software is
 * #  furnished to do so, subject to the following conditions:
 * #
 * #  The above copyright notice and this permission notice shall be included in all
 * #  copies or substantial portions of the Software.
 * #
 * #  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * #  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * #  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * #  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * #  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * #  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * #  SOFTWARE.
 ******************************************************************************/

// Generated from Aggregation.g4 by ANTLR 4.9
// jshint ignore: start
import antlr4 from 'antlr4';

// This class defines a complete generic visitor for a parse tree produced by AggregationParser.

export default class AggregationVisitor extends antlr4.tree.ParseTreeVisitor {

	// Visit a parse tree produced by AggregationParser#aggregationStatement.
	visitAggregationStatement(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#Reduction.
	visitReduction(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#CumReduction.
	visitCumReduction(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#IdentityAggregation.
	visitIdentityAggregation(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#AggregationGroup.
	visitAggregationGroup(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#AggregationBinOp.
	visitAggregationBinOp(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#RolReduction.
	visitRolReduction(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#Count.
	visitCount(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#ExpressionGroup.
	visitExpressionGroup(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#ExpressionBinOp.
	visitExpressionBinOp(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#IdentityExpression.
	visitIdentityExpression(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#conditionStatement.
	visitConditionStatement(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#ConditionBinOp.
	visitConditionBinOp(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#ConditionNegate.
	visitConditionNegate(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#IdentityCondition.
	visitIdentityCondition(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#ConditionGroup.
	visitConditionGroup(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#SelectorOrder.
	visitSelectorOrder(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#SelectorIn.
	visitSelectorIn(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#ConstantMeasure.
	visitConstantMeasure(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#ReferenceMeasure.
	visitReferenceMeasure(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#ReferenceCategory.
	visitReferenceCategory(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#literals.
	visitLiterals(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#FloatLiteral.
	visitFloatLiteral(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by AggregationParser#StringLiteral.
	visitStringLiteral(ctx) {
	  return this.visitChildren(ctx);
	}



}